import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();


const app = express();
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use(cors({ origin: "http://localhost:5173" }));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
