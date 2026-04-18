import Developer from "../models/developer.model.js";
import bcrypt from "bcrypt";
import { generateJWToken } from "../utils/token.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    const dev = await Developer.findOne({ email });

    if (!dev || !(await bcrypt.compare(password, dev.password)))
        return res.status(400).json({ error: "Invalid" });

    //Token Generation:
    const accessToken = generateJWToken({ id: dev._id, email: dev.email });

    res.cookie("auth_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 43200000
    });

    return res.status(200).json({ userAuthenticated: true });
};