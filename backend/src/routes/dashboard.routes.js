
import express from "express";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { userDashboard } from "../controllers/dashboard.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard", userAuth, userDashboard);

export default dashboardRouter;