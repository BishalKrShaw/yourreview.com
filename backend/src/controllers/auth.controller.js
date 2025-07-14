import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import validation from "../utils/validation.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { Campaign } from "../models/campaign.models.js";

export const signupUser = async (req, res) => {
  try {
    validation(req);

    const { firstName, lastName, businessName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      businessName,
      emailId,
      password: hashPassword,
    });

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10m" }
    );

    const link = `${process.env.CLIENT_SITE}/verify-email?token=${token}`;

    await sendEmail({
      to: user.emailId,
      subject: "Email Verification",
      html: `<p>Hello ${user.firstName},</p>
              <p>Please verify your email to complete your signup at YourReview.</p>
              <p><a href="${link}">Click here to verify your email</a></p>
              <p>Thanks,<br/>The YourReview Team</p>
            `,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "Email verification mail sent to your mail ID.",
        user,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Oops! Something went wrong.",
      ERROR: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify you mail before login." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = await user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully!", user });
  } catch (error) {
    return res.status(400).json({ success: false, ERROR: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Clear the token cookie properly
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "Lax",
    });

    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, ERROR: error.message });
  }
};

export const verifyAuth = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    return res.status(400).json({ success: false, ERROR: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ emailId: email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.CLIENT_SITE}/reset-password/${token}`;

    await sendEmail({
      to: email,
      subject: "Password Reset",
      html: `
        <p>Hello ${user.firstName},</p>
        <p>You requested a password reset.</p>
        <a href="${resetLink}">Click here to proceed.</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.status(200).json({ success: true, message: "Reset link sent to your email." });
  } catch (error) {
    console.error("Forgot Password Error:", error); // helpful!
    res.status(500).json({ success: false, error: error.message });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const hashed = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(decoded.id, { password: hashed });

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid or expired token" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Step 1: Get all campaigns by the user
    const campaigns = await Campaign.find({ userId });

    // Step 2: For each campaign, delete its reviews and then the campaign itself (so pre hook works)
    for (const campaign of campaigns) {
      // await Review.deleteMany({ campaignId: campaign._id }); 
      await campaign.deleteOne(); // this will trigger campaignSchema.pre("deleteOne")
    }

    // Step 3: Delete the user
    await User.findByIdAndDelete(userId);

    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "Account and all related data deleted." });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
