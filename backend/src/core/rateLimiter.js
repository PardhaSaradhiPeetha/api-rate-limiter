import Developer from "../models/developer.model.js";
import tokenBucket from "./tokenBucket.js";
import { hashKey } from "../utils/hashKey.js";


export const rateLimiter = async (apiKey, endUserId, endUserIp) => {
    const hashedKey = hashKey(apiKey);
    const dev = await Developer.findOne({
        "apiKeys.keyHash": hashedKey,
        "apiKeys.active": true
    });

    if (!dev) {
        return {
            allowed: false,
            error: "API key is invalid"
        }
    }

    //TODO:Need to add redis logic and tokenBucket algorithm
};
