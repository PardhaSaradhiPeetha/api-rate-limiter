import Developer from "../models/developer.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if(Developer.findOne({email: email})){
            return res.json({
                message: " Account aleardy exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const dev = await Developer.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(200).json({ message: "Registered Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Register failed" });
    }
};