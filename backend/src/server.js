
import express from 'express';
import connectDatabase from './db/database.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRouter from './routes/auth.routes.js';

dotenv.config({
  path: './env'
})

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());

app.use(cors({
  origin: "",
  credentials: true
}))

app.use(cookieParser());

app.use("/", authRouter);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running/connected successfully at PORT ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Server running/connection failed!");
  });