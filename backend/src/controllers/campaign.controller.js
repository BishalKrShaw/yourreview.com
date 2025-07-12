
import {nanoid} from "nanoid";
import { Campaign } from "../models/campaign.models.js";

export const createCampaign = async (req, res) => {
  try {
    const {campaignName, businessName, productOrService} = req.body;

    const campaignId = nanoid(8);
    const user = req.user;

    const reviewLink = `${process.env.DOMAIN_NAME}/api/review/${campaignId}`;

    const campaign = await Campaign.create({
      userId: user._id,
      campaignName,
      businessName,
      productOrService,
      campaignId,
      reviewLink,
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
    const {id} = req.params;

    const user = req.user;

    const campaign = await Campaign.findOneAndDelete({_id: id, userId: req.user._id});
    if(!campaign) {
      throw new Error("No campaign found!");
    }

    return res.status(200).json({success: true, message: "Campaign deleted successfully!"});

  } catch (error) {
    return res.status(400).json({success: false, ERROR: error.message});
  }
}