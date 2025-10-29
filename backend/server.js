// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
// ⚠️ We have removed the inline user schema and the old app.post routes.

// STEP 1: Import the route file where your correct logic is defined
import userRoutes from "./routes/userRoutes.js"; 

dotenv.config();
connectDB(); // Connect to the database

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local dev
      "https://webdev-finals-draft.vercel.app" // for deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

 
app.get("/", (req, res) => {
  res.send("✅ Backend is connected!");
});


app.use("/api/users", userRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
