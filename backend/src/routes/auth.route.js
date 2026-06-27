import express from "express";
import { signup } from "../auth/signup.js";
import { login } from "../auth/login.js";
import { logout } from "../auth/logout.js"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { Developer } from "../models/developer.model.js";

const router = express.Router();
router.post("/register",signup);
router.post("/login",login);
router.post("/logout",logout);

router.get("/profile",authMiddleware, async (req,res) => {
    const dev = await Developer.findById(req.user.id).select("name email").lean();

    if (!dev) {
        return res.status(404).json({ message: "Developer Not found" });
    }

    res.json({
        id: dev._id,
        name: dev.name,
        email: dev.email
    });
});

export default router;
