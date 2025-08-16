import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

const app = express();
app.use(express.json());

// Use process.env with fallback defaults
const PORT = process.env["PORT"] || 4000;
const MONGO_URI =
  (process.env["MONGO_URI"] ||
  "mongodb://127.0.0.1:27017/personal_assistant");

// Connect MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Example route
app.get("/", (req, res) => {
  res.send("Personal Assistant Backend is running 🚀");
});
