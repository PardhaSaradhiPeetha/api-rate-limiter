import crypto from "crypto";
export const hashKey = (rawKey) => {
    const salt = process.env.SALT_KEY;

    if (!salt)
        throw new Error("salt key missing!!");

    if (!rawKey)
        throw new Error("raw key missing!!");

   return crypto.createHmac("sha256", salt).update(rawKey).digest('hex');
};
