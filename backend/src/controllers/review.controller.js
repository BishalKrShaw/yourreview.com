import { Campaign } from "../models/campaign.models.js";
import { Review } from "../models/review.models.js";

// PUBLIC: Customer submits review
export const submitReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, customerEmailId, rating, comment } = req.body;

    const campaign = await Campaign.findOne({ campaignId: id });
    if (!campaign) throw new Error("Invalid campaign link");

    const review = await Review.create({
      campaignId: campaign._id,
      customerName,
      customerEmailId,
      rating,
      comment,
    });

    return res.status(201).json({ success: true, message: "Review created successfully!", review });
  } catch (error) {
    return res.status(400).json({ success: false, ERROR: error.message });
  }
};

// PUBLIC: Show on embed/widget
export const getCampaignReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findOne({ campaignId: id });
    if (!campaign) throw new Error("Campaign not found");

    const reviews = await Review.find({ campaignId: campaign._id });
    return res.status(200).json({ success: true, message: "All reviews", reviews });
  } catch (error) {
    return res.status(400).json({ success: false, ERROR: error.message });
  }
};

// DASHBOARD: Show reviews to campaign owner
export const getReviewsForDashboard = async (req, res) => {
  try {
    const campaignId = req.params.id;

    const campaign = await Campaign.findOne({
      _id: campaignId,
      userId: req.user._id,
    });
    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found or unauthorized" });
    }

    const reviews = await Review.find({ campaignId: campaign._id }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    return res.status(500).json({ success: false, ERROR: error.message });
  }
};
