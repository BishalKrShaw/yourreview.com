
import express from "express";
import { createCampaign, getCampaign } from "../controllers/campaign.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

const campaignRouter = express.Router();

campaignRouter.post("/create-campaign", userAuth, createCampaign);
campaignRouter.get("/campaigns", userAuth, getCampaign);

export default campaignRouter;