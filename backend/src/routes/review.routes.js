
import express from "express";
import { getCampaignReviews, submitReview } from "../controllers/review.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/review/:id", submitReview);
reviewRouter.get("/review/:id", userAuth, getCampaignReviews);

export default reviewRouter;