import express from "express";
import { serveReviewWidget } from "../controllers/embed.controller.js";

const embedScriptRouter = express.Router();

embedScriptRouter.get("/widget/:campaignId.js", serveReviewWidget);

export default embedScriptRouter;
