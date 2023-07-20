import mongoose, { mongo } from "mongoose";

mongoose.connect(process.env.MONGO_URI)