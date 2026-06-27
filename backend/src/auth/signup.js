import { Developer } from "../models/developer.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingDeveloper = await Developer.findOne({ email });

        if (existingDeveloper) {
            return res.status(409).json({
                error: "Account already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const dev = await Developer.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Registered Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Register failed" });
    }
};