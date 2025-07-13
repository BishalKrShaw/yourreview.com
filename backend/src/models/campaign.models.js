
import mongoose from "mongoose";
import { Review } from "./review.models.js";

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
  },

  scriptURL: {
    type: String,
    required: true,
  }

}, {timestamps: true});

campaignSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    await Review.deleteMany({ campaignId: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

export const Campaign = mongoose.model("Campaign", campaignSchema);