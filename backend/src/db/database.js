
import mongoose from "mongoose";
import {DB_NAME} from '../utils/constants.js'

const connectDatabase = async () => {
  try {
    const connectDB = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed! ", err);
  }
}

export default connectDatabase;