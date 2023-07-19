//jshint esversion:6
import mongoose from "mongoose";
import { connectDB } from "./connectDB.mjs";

export async function getPerformances(){
    connectDB();
    const performances = await mongoose.model('performances').find({});
    return performances;
}