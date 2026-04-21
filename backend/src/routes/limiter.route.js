import express from "express";
import { checkLimit } from "../controllers/limiter.controller.js";

const router = express.Router();
router.post("/check", checkLimit);

export default router;