
import express from "express";
import { userProfile } from "../controllers/profile.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, userProfile);

export default profileRouter;