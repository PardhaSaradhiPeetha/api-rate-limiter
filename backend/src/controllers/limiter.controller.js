import { Developer } from "../models/developer.model.js";
import { hashKey } from "../utils/hashKey.js";
import { applyRateLimit } from "../core/rateLimiter.js";

export const checkLimit = async (req, res) => {
    try {
        const apiKey = req.headers['x-api-key'];
        const ip = req.headers['x-forwarded-ip']?.split(",")[0] || req.ip;
        const reqCost = req.body;

        if (!apiKey) {
            return res.status(400).json({ error: "api key required" });
        }

        const hashedApiKey = hashKey(apiKey);
        const dev = await Developer.findOne({
            "apiKeys.keyHash": hashedApiKey
        });

        if (!dev) {
            return res.status(403).json({ error: "Invalid Api key" });
        }

        const apiKeyData = dev.apiKeys.find(
            (k) => (k.keyHash === hashedApiKey)
        );

        const result = await applyRateLimit(apiKeyData, reqCost, ip);
        return res.status(result.allowed ? 200 : 429).json(result);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};