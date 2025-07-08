
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const userAuth = async (req, res, next) => {
  try {
    const {token} = req.cookies;
    if(!token) {
      throw new Error("Login first.");
    }

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const {_id} = decodedData;

    const user = await User.findById({_id});
    if(!user) {
      throw new Error("User not found.");
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(500).json({success: false, ERROR: error.message});
  }
}