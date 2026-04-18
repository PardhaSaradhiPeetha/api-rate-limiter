import express from "express";
import { signup } from "../auth/signup.js";
import { login } from "../auth/login.js";
import { logout } from "../auth/logout.js"
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/register",signup);
router.post("/login",login);
router.post("/logout",logout);

//TODO: connect in frontend
router.get("/profile",authMiddleware, (req,res) => {
    res.json({message: "Authorized Developer"});
});

export default router;