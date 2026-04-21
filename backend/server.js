import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import limiterRoute from "./src/routes/limiter.route.js"

dotenv.config();

const app = express();

app.use(cors(
  {
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST"],
    credentials: true
  }
));

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.send("Rate Limiter API Running");
});

app.use("/api",limiterRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});