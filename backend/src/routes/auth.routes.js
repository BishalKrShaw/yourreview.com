
import express from 'express';
import { loginUser, logoutUser, signupUser } from '../controllers/auth.controller.js';
import { verifyEmail } from '../controllers/verifyEmail.controller.js';

const authRouter = express.Router();

authRouter.post("/signup", signupUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/verify-email", verifyEmail);

export default authRouter;