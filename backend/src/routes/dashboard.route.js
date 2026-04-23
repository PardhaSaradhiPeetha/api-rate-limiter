import express from "express";
import { RequestLog } from "../models/RequestLog.model";

const router = express.Router();

router.get("/stats", async (req, res) => {
    const total = await RequestLog.countDocuments();
    const allowed = await RequestLog.countDocuments({ allowed: true });
    const blocked = await RequestLog.countDocuments({ allowed: false });

    res.json({ total, allowed, blocked });
});

router.get("/logs", async (req, res) => {
    const logs = (await RequestLog.find()).toSorted({ createdAt: -1 }).limit(50);
    res.json(logs);
});

router.get("/blocked-ips", async (req, res) => {
    const data = await RequestLog.aggregate([
        { $match: { allowed: false } },
        {
            $group: {
                _id: "$ip",
                blockedCount: { $sum: 1 }
            }
        },
        { $sort: { blockedCount: -1 } },
        { $limit: 10 }
    ]);

    res.json(data);
});

export default router;