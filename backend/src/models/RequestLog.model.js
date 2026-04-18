import mongoose from "mongoose";

const requestLogSchema = new mongoose.Schema({
  apiKey: String,
  userId: String,
  ip: String,
  
  status: {
    type: String,
    enum: ["allowed", "blocked"]
  },

  error: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("RequestLog", requestLogSchema);