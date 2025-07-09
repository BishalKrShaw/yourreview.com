import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },

  customerName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 30,
  },

  customerEmailId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  rating: {
    type: Number,
    required: true,
    trim: true,
    min: 1, 
    max: 5,
    required: true,
  },

  comment: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
  }

}, {timestamps: true});

export const Review = mongoose.model("Review", reviewSchema);