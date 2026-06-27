import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
    apiKeyController,
    deleteApiKey,
    listApiKeys,
    updateApiKeyStatus
} from "../controllers/apiKey.controller.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/api-keys", listApiKeys);
router.post("/generate-api-key", apiKeyController);
router.patch("/api-keys/:keyId", updateApiKeyStatus);
router.delete("/api-keys/:keyId", deleteApiKey);

export default router;
