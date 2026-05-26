process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err, origin) => {
  console.error('Caught exception:', err, 'Exception origin:', origin);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import gmailRoutes from "./routes/gmailRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import { startEmailCleanupJob } from "./mcp/jobs/emailCleanupJob.js";
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 5000;
// Middleware
app.use(cors({
    origin: ["http://localhost:4200", "http://localhost:5173"], // frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
// Connect to DB safely
(async () => {
    try {
        await connectDB();
        console.log("✅ Database connected");
    }
    catch (err) {
        console.error("❌ DB connection failed:", err);
        process.exit(1); // exit if DB fails
    }
})();
// // Start scheduled job safely
// try {
//   startEmailCleanupJob();
//   console.log("✅ Email cleanup job started");
// } catch (err) {
//   console.error("❌ Cleanup job failed:", err);
// }
// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/gmail", gmailRoutes);
app.use("/api/classroom", classroomRoutes); // updated classroom routes
app.use("/api/auth", authRoutes);
// CRUD routes
app.use("/api/materials", materialRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/assignments", assignmentRoutes);
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});