import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const verifyEmail = async (req, res) => {
  try {
    const {token} = req.query;

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const {_id} = decodedData;
    
    const user = await User.findOne({_id});
    if(!user) {
      throw new Error("User not found.");
    }

    if(user.isVerified) {
      return res.status(200).json({success: true, message: "User already verified"});
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({success: true, message: "Email verified successfully!"});
    
  } catch (error) {
    return res.status(400).json({success: false, message: "Invalid or expired token."});
  }
}