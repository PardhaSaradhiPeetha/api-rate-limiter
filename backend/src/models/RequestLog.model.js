import mongoose from "mongoose";

const requestLogSchema = new mongoose.Schema({
  apiKey: String,
  ip: String,
  allowed: Boolean,
  cost: Number,
}, { timestamps: true });

export const RequestLog = mongoose.model("RequestLog", requestLogSchema);