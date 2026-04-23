import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
  keyHash: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  active: { type: Boolean, default: true }
},{timestamps:true});

const developerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  apiKeys: [apiKeySchema]
},{timestamps:true});

developerSchema.index({"apiKeys.keyHash":1});

export const Developer = mongoose.model("Developer", developerSchema);