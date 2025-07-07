
import express from 'express';
import { getRegistedUser, registerUser } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/signup", registerUser);
authRouter.post("/login", getRegistedUser);

export default authRouter;