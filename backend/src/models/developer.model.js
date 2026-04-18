import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
  keyHash: { type: String, required: true, index: true }, 
  name: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

const developerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  apiKeys: [apiKeySchema] 
});

export const Developer = mongoose.model("Developer", developerSchema);