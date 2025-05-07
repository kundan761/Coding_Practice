import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = mongoose.connect(process.env.MONGODB_URI);

export default connectDB;