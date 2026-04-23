import mongoose from "mongoose";

const requestLogSchema = new mongoose.Schema({
  apiKey: String,
  developerId: String,
  ip: String,
  allowed: Boolean,
  cost: Number,
}, { timestamps: true });

requestLogSchema.index({ createdAt: -1 });
requestLogSchema.index({ apiKeyHash: -1 });

export const RequestLog = mongoose.model("RequestLog", requestLogSchema);