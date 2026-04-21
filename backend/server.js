import express from "express";
import dotenv from "dotNODE_ENV";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors(
  {
    origin: process.NODE_ENV.FRONTEND_URI,
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


app.listen(process.NODE_ENV.PORT, () => {
  console.log(`Server running on port ${process.NODE_ENV.PORT}`);
});