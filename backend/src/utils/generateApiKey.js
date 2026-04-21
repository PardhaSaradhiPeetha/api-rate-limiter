import crypto from "crypto";
import { hashKey } from "./hashKey.js";

export const generateApiKey = () => {
    const rawKey = crypto.randomBytes(32).toString("base64url");
    const hashedKey = hashKey(rawKey);
    return { rawKey, hashedKey };
};