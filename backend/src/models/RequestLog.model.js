import mongoose from "mongoose";

const requestLogSchema = new mongoose.Schema({
  apiKeyHash: { type: String, required: true },
  developerId: { type: mongoose.Schema.Types.ObjectId, ref: "Developer", required: true },
  ip: String,
  allowed: Boolean,
  cost: Number,
}, { timestamps: true });

requestLogSchema.index({ createdAt: -1 });
requestLogSchema.index({ apiKeyHash: 1 });
requestLogSchema.index({ developerId: 1, createdAt: -1 });

export const RequestLog = mongoose.model("RequestLog", requestLogSchema);
