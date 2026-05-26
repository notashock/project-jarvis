import express from "express";
import { summarizeEmailsWithTasks } from "../mcp/tools/geminiTool.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const router = express.Router();

/**
 * POST /emails/process
 * Summarize latest emails and generate tasks
 */
router.post("/emails/process", requireAuth, async (req, res) => {
    try {
        const userEmail = req.user.email;
        // Fetch up to 5 emails to avoid rate limits
        const result = await summarizeEmailsWithTasks(userEmail, 5);
        return successResponse(res, "Emails summarized and tasks processed successfully", {
            summary: result.summary,
            taskCount: result.tasks.length,
            tasks: result.tasks,
            emails: result.emails,
        });
    }
    catch (err) {
        return errorResponse(res, "Failed to process emails and generate tasks", err, 500);
    }
});

export default router;