
import express from "express";
import { getCampaignReviews, getReviewsForDashboard, submitReview } from "../controllers/review.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

const reviewRouter = express.Router();

// Public (customers)
reviewRouter.post("/review/:id", submitReview);
reviewRouter.get("/review/:id", getCampaignReviews);

// Authenticated user (owner) dashboard
reviewRouter.get("/reviews/campaign/:id", userAuth, getReviewsForDashboard);

export default reviewRouter;