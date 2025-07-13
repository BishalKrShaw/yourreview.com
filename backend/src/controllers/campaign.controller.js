
import {nanoid} from "nanoid";
import { Campaign } from "../models/campaign.models.js";

export const createCampaign = async (req, res) => {
  try {
    const {campaignName, businessName, productOrService} = req.body;

    const campaignId = nanoid(8);
    const user = req.user;

    const reviewLink = `${process.env.CLIENT_SITE}/review/${campaignId}`;

    const scriptURL = `<script src="${process.env.DOMAIN_NAME}/api/embed/widget/${campaignId}.js"></script>`;


    const campaign = await Campaign.create({
      userId: user._id,
      campaignName,
      businessName,
      productOrService,
      campaignId,
      reviewLink,
      scriptURL
    });


    return res.status(201).json({success: true, message: "Campaign created successfully", campaign});

  } catch (error) {
    return res.status(500).json({success: false, message: "Something went wrong", ERROR: error.message});
  }
}

export const getCampaign = async (req, res) => {
  try {
    const campaigns = await Campaign.find({userId: req.user._id});

    return res.status(200).json({success: true, count: campaigns.length, campaigns});

  } catch (error) {
    return res.status(500).json({success: false, ERROR: error.message});
  }
}

export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    await campaign.deleteOne();

    return res.status(200).json({ success: true, message: "Campaign and associated reviews deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, ERROR: error.message });
  }
};
