import express from 'express';
import { userAuth } from '../middlewares/userAuth.middleware.js';
import { getUserProfile } from '../controllers/profile.controller.js';

const profileRouter = express.Router();

profileRouter.get("/", userAuth, getUserProfile);

export default profileRouter;