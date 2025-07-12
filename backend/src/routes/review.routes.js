
import express from "express";
import { getCampaignReviews, submitReview } from "../controllers/review.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/:id", submitReview);
reviewRouter.get("/:id", userAuth, getCampaignReviews);

export default reviewRouter;