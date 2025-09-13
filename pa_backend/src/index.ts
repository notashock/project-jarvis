import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import gmailRoutes from "./routes/gmailRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import classroomRoutes from "./routes/classroomRoutes.js"
import { startEmailCleanupJob } from "./mcp/jobs/emailCleanupJob.js"

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

// startEmailCleanupJob();
// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/gmail", gmailRoutes);
app.use("/api/classroom",classroomRoutes);
app.use("/api/auth", authRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
