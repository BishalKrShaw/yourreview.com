import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const {firstName, lastName, businessName, emailId, password} = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      businessName,
      emailId,
      password: hashPassword
    });

    res.status(201).json({success: true, message: "User created successfully!", user});

  } catch (error) {
    res.status(500).json({success: false, message: "Oops! Something went wrong.", ERROR: error.message});
  }
}

export const getRegistedUser = async (req, res) => {
  try {
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId});
    if(!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    res.status(200).json({success: true, message: "User found successfully!", user});

  } catch (error) {
    res.status(400).json({success: false, ERROR: error.message});
  }
}