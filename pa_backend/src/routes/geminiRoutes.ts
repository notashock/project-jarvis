import express from "express";
import { summarizeEmailsWithTasks } from "../mcp/tools/geminiTool.js";

const router = express.Router();

/**
 * POST /emails/process
 * Summarize latest emails into two blocks:
 *  1. Normal summary (digest)
 *  2. Task summary (saved directly in DB)
 */
router.post("/emails/process", async (_req, res, next) => {
  try {
    const result = await summarizeEmailsWithTasks(); // default latest 10 emails
    res.json({
      success: true,
      message: "Emails summarized and tasks processed successfully",
      summary: result.summary,
      taskCount: result.tasks.length,
      tasks: result.tasks,
      emails: result.emails,
    });
  } catch (err: any) {
    next(err);
  }
});

export default router;
