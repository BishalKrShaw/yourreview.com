import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import validation from "../utils/validation.js";
import validator from 'validator';

export const signupUser = async (req, res) => {
  try {
    validation(req);

    const {firstName, lastName, businessName, emailId, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      businessName,
      emailId,
      password: hashPassword
    });

    return res.status(201).json({success: true, message: "User created successfully!", user});

  } catch (error) {
    return res.status(500).json({success: false, message: "Oops! Something went wrong.", ERROR: error.message});
  }
}

export const loginUser = async (req, res) => {
  try {
    const {emailId, password} = req.body;
    if(!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({emailId});
    if(!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = await user.getJWT();
    res.cookie("token", token);

    return res.status(200).json({success: true, message: "User found successfully!", user});

  } catch (error) {
    return res.status(400).json({success: false, ERROR: error.message});
  }
}

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {expires: new Date()});
    return res.status(200).json({success: true, message: "User logged out successfully!"});
  } catch (error) {
    return res.status(500).json({success: false, ERROR: error.message});
  }
}