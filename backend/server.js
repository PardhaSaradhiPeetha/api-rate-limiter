import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.config.js";
import limiterRoute from "./src/routes/limiter.route.js";
import dashboardRoute from "./src/routes/dashboard.route.js";
import authRoute from "./src/routes/auth.route.js";
import developerRoute from "./src/routes/developer.route.js";

dotenv.config();

const app = express();
const allowedOrigins = [process.env.FRONTEND_URI, "http://localhost:5173", "http://127.0.0.1:5173", "https://api-rate-limiter-9yzk.onrender.com"].filter(Boolean);

app.use(cors(
  {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
  }
));

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.send("Rate Limiter API Running");
});

app.use("/api", limiterRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/auth", authRoute);
app.use("/api/developer", developerRoute);

const startServer = async () => {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Server startup failed");
    console.error(`Reason: ${err.message}`);
    process.exit(1);
  }
};

startServer();
