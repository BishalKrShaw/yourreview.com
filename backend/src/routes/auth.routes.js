
import express from 'express';
import { loginUser, logoutUser, signupUser, verifyAuth } from '../controllers/auth.controller.js';
import { verifyEmail } from '../controllers/verifyEmail.controller.js';
import { userAuth } from '../middlewares/userAuth.middleware.js';

const authRouter = express.Router();

authRouter.post("/signup", signupUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/verify-email", verifyEmail);
authRouter.get("/verify", userAuth, verifyAuth);

export default authRouter;