
import { Campaign } from "../models/campaign.models.js";
import { Review } from "../models/review.models.js";

export const userDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all campaigns by the user
    const campaigns = await Campaign.find({ userId }).sort({ createdAt: -1 });

    // Get total review count for user's campaigns
    const campaignIds = campaigns.map(c => c._id);
    const totalReviews = await Review.countDocuments({ campaignId: { $in: campaignIds } });

    // Get review count per campaign
    const reviewsPerCampaign = await Review.aggregate([
      { $match: { campaignId: { $in: campaignIds } } },
      { $group: { _id: "$campaignId", count: { $sum: 1 } } }
    ]);

    const reviewCountMap = {};
    reviewsPerCampaign.forEach(rc => {
      reviewCountMap[rc._id.toString()] = rc.count;
    });

    const campaignSummaries = campaigns.map(c => ({
      _id: c._id,
      campaignName: c.campaignName,
      createdAt: c.createdAt,
      reviewCount: reviewCountMap[c._id.toString()] || 0
    }));

    return res.status(200).json({
      success: true,
      totalCampaigns: campaigns.length,
      totalReviews,
      campaignSummaries
    });

  } catch (error) {
    return res.status(500).json({ success: false, ERROR: error.message });
  }
};
