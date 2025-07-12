
import express from "express";
import { createCampaign, deleteCampaign, getCampaign } from "../controllers/campaign.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

const campaignRouter = express.Router();

campaignRouter.post("/create-campaign", userAuth, createCampaign);
campaignRouter.get("/", userAuth, getCampaign);
campaignRouter.delete("/:id", userAuth, deleteCampaign);

export default campaignRouter;