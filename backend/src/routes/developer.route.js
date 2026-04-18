//TODO: Dashboard route also

import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { apiKeyController } from "../controllers/apiKey.controller.js";

const router = express.Router();
router.get("/generate-api-key", authMiddleware, apiKeyController);