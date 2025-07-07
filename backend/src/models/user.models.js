
import mongoose from "mongoose";

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
  }

}, {timestamps: true});

export const User = mongoose.model("User", userSchema);