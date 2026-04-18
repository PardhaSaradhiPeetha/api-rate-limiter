import { generateApiKey } from "../utils/generateApiKey.js";
import Developer from "../models/developer.model.js"

export const apiKeyController = async (req, res) => {
    try {
        const { rawKey, hashKey } = generateApiKey();
        const isUpdated = await Developer.findByIdAndUpdate(
            req.user.id,
            {
                $push: {
                    apiKeys : {
                        keyHash: hashKey,
                        name: req.body.name,
                        createdAt: new Date(),
                        active: true
                    }
                }

            }
        );

        if(!isUpdated)
            return res.status(404).json({message: "Developer Not found"});

        res.status(201).json(
            {
                message: "Api key Generated Successfully",
                apiKey: rawKey
            }
        );

    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({ message: "Failed to generate Key" });
    }
};