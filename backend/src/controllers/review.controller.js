import { Campaign } from "../models/campaign.models.js";
import { Review } from "../models/review.models.js";

export const submitReview = async (req, res) => {
  try {
    const {id} = req.params;
    const {customerName, customerEmailId, rating, comment} = req.body;

    const campaign = await Campaign.findOne({campaignId: id});

    if(!campaign) {
      throw new Error("Invalid campaign link");
    }

    const review = await Review.create({
      campaignId: campaign._id,
      customerName,
      customerEmailId,
      rating,
      comment,
    });

    return res.status(201).json({success: true, message: "Review created successfully!", review});

  } catch (error) {
    return res.status(400).json({success: false, ERROR: error.message});
  }
}

export const getCampaignReviews = async (req, res) => {
  try {
    const {id} = req.params;

    const campaign = await Campaign.findOne({campaignId: id});
    if(!campaign) {
      throw new Error("Campaign not found");
    }

    const reviews = await Review.find({campaignId: campaign._id});

    return res.status(200).json({success: true, message: "All reviews", reviews});

  } catch (error) {
    return res.status(400).json({success: false, ERROR: error.message});
  }
}