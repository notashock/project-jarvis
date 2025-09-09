import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import gmailRoutes from "./routes/gmailRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"
import authRoutes from "./routes/auth.js" // 👈 import routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:4200", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/gmail", gmailRoutes) // 👈 mount email routes
app.use("/api/auth", authRoutes); // 👈 mount auth routes
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
