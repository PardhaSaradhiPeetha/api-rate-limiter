import express from "express";
import mongoose from "mongoose";
import { RequestLog } from "../models/RequestLog.model.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
 
const router = express.Router();

router.use(authMiddleware);

router.get("/stats", async (req, res) => {
    const developerId = req.user.id;
    const total = await RequestLog.countDocuments({ developerId });
    const allowed = await RequestLog.countDocuments({ developerId, allowed: true });
    const blocked = await RequestLog.countDocuments({ developerId, allowed: false });

    res.json({ total, allowed, blocked });
});

router.get("/logs", async (req, res) => {
    const developerId = req.user.id;
    const logs = await RequestLog.find({ developerId }).sort({ createdAt: -1 }).limit(50).lean();
    res.json(logs);
});

router.get("/blocked-ips", async (req, res) => {
    const developerId = new mongoose.Types.ObjectId(req.user.id);
    const data = await RequestLog.aggregate([
        { $match: { developerId, allowed: false } },
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

router.get("/ip-summary", async (req, res) => {
    const developerId = new mongoose.Types.ObjectId(req.user.id);
    const data = await RequestLog.aggregate([
        { $match: { developerId } },
        {
            $group: {
                _id: "$ip",
                totalRequests: { $sum: 1 },
                allowedRequests: {
                    $sum: {
                        $cond: [{ $eq: ["$allowed", true] }, 1, 0]
                    }
                },
                blockedRequests: {
                    $sum: {
                        $cond: [{ $eq: ["$allowed", false] }, 1, 0]
                    }
                }
            }
        },
        {
            $sort: { totalRequests: -1, _id: 1 }
        },
        { $limit: 25 }
    ]);

    res.json(
        data.map((item) => ({
            ip: item._id,
            totalRequests: item.totalRequests,
            allowedRequests: item.allowedRequests,
            blockedRequests: item.blockedRequests
        }))
    );
});

export default router;
