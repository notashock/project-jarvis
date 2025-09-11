import express from "express";
import { summarizeEmails } from "../mcp/tools/geminiTool.js";

const router = express.Router();

router.post("/summarize", async (_req, res, next) => {
  try {
    const result = await summarizeEmails(); // default latest 10 emails
    res.json(result);
  } catch (err: any) {
    next(err);
  }
});

export default router;
