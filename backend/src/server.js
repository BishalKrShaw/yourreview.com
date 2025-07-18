
import express from 'express';
import connectDatabase from './db/database.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
import campaignRouter from './routes/campaign.routes.js';
import reviewRouter from './routes/review.routes.js';
import profileRouter from './routes/profile.routes.js';
import embedScriptRouter from './routes/embed.routes.js';

dotenv.config({
  path: './env'
})

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_SITE,
  credentials: true
}))

app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/campaigns", campaignRouter);
app.use("/api", reviewRouter);
app.use("/api/profile", profileRouter);
app.use("/api/embed", embedScriptRouter);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running/connected successfully at PORT ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Server running/connection failed!");
  });