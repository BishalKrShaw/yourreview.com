
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

  firstName: {
    type: String, 
    required: true,
    lowercase: true,
    trim: true,
    minLength: 1,
    maxLength: 20,
  },

  lastName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minLength: 1,
    maxLength: 20,
  },

  businessName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minLength: 1,
    maxLength: 20,
  },

  emailId: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  }

}, {timestamps: true});

userSchema.methods.getJWT = async function() {
  const user = this;
  const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
  return token;
}

export const User = mongoose.model("User", userSchema);