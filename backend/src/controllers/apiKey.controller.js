import { generateApiKey } from "../utils/generateApiKey.js";
import { Developer } from "../models/developer.model.js";
import { getLimits } from "../core/LimitProvider.js";

const serializeApiKey = (apiKey) => ({
    id: apiKey.id || apiKey._id,
    name: apiKey.name,
    apiKey: apiKey.key,
    active: apiKey.active,
    createdAt: apiKey.createdAt,
    updatedAt: apiKey.updatedAt
});

export const listApiKeys = async (req, res) => {
    try {
        const dev = await Developer.findById(req.user.id).select("apiKeys").lean();

        if (!dev)
            return res.status(404).json({ message: "Developer Not found" });

        res.json(dev.apiKeys.map(serializeApiKey));
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({ message: "Failed to load keys" });
    }
};

export const apiKeyController = async (req, res) => {
    try {
        const dev = await Developer.findById(req.user.id);

        if (!dev)
            return res.status(404).json({ message: "Developer Not found" });

        const { maxApiKeys } = getLimits();
        if (dev.apiKeys.length >= maxApiKeys)
            return res.status(400).json({ message: `Maximum API keys reached (${maxApiKeys})` });

        const { rawKey, hashedKey } = generateApiKey();
        const keyName = req.body.name?.trim() || `API Key ${dev.apiKeys.length + 1}`;

        dev.apiKeys.push({
            keyHash: hashedKey,
            key: rawKey,
            name: keyName,
            active: true
        });

        await dev.save();

        const createdKey = dev.apiKeys[dev.apiKeys.length - 1];

        res.status(201).json(
            {
                message: "Api key Generated Successfully",
                apiKey: rawKey,
                key: serializeApiKey(createdKey)
            }
        );

    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({ message: "Failed to generate Key" });
    }
};

export const updateApiKeyStatus = async (req, res) => {
    try {
        const { keyId } = req.params;
        const { active } = req.body;

        if (typeof active !== "boolean")
            return res.status(400).json({ message: "active must be boolean" });

        const dev = await Developer.findOneAndUpdate(
            { _id: req.user.id, "apiKeys._id": keyId },
            {
                $set: {
                    "apiKeys.$.active": active
                }
            },
            { new: true }
        );

        const apiKey = dev?.apiKeys.id(keyId);

        if (!apiKey)
            return res.status(404).json({ message: "API key not found" });

        res.json(serializeApiKey(apiKey));

    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({ message: "Failed to update key" });
    }
};

export const deleteApiKey = async (req, res) => {
    try {
        const { keyId } = req.params;
        const dev = await Developer.findByIdAndUpdate(
            req.user.id,
            {
                $pull: {
                    apiKeys: { _id: keyId }
                }
            },
            { new: true }
        );

        if (!dev)
            return res.status(404).json({ message: "Developer Not found" });

        res.json({ message: "API key deleted" });
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({ message: "Failed to delete key" });
    }
};
