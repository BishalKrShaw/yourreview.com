
import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  campaignName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
  },

  businessName: {
    type: String,
    trim: true,
    required: true,
    minLength: 1,
  },

  productOrService: {
    type: String,
    trim: true,
    required: true,
    minLength: 1
  },
  
  campaignId: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },

  reviewLink: {
    type: String,
    required: true,
    trim: true,
  }

}, {timestamps: true});

export const Campaign = mongoose.model("Campaign", campaignSchema);