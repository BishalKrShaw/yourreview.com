import { Campaign } from "../models/campaign.models.js";
import { Review } from "../models/review.models.js";

export const serveReviewWidget = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findOne({ campaignId });
    if (!campaign) return res.status(404).send("Campaign not found");

    const reviews = await Review.find({ campaignId: campaign._id }).select("customerName comment rating");

    const reviewsHTML = reviews.map(r => `
  <div style="
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    margin-bottom: 1rem;
    font-size: 14px;
  ">
    <div style="font-weight: 600; margin-bottom: 0.5rem;">${r.customerName}</div>
    <div style="color: #333; margin-bottom: 0.5rem;">${r.comment}</div>
    <div style="color: #fbbf24;">
      ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
      <span style="color: #999; font-size: 12px; margin-left: 5px;">${r.rating}/5</span>
    </div>
  </div>
`).join("");

const html = `
  <div style="
    font-family: 'Segoe UI', sans-serif;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 1.5rem;
    background-color: #fff;
    max-width: 500px;
    color: #111;
  ">
    <h3 style="margin-bottom: 1rem; font-size: 20px; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Customer Reviews</h3>
    ${reviewsHTML || "<p style='color: #999;'>No reviews yet.</p>"}
  </div>
`;


    res.set("Content-Type", "html/javascript");
    res.send(`document.write(${JSON.stringify(html)});`);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};
