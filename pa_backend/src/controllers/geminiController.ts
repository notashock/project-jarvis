// src/controllers/geminiController.ts
import type { Request, Response } from "express";
import { summarizeText } from "../services/geminiService.js";
import Email from "../models/Email.js"; // ✅ import your Email model

export const summarizeEmails = async (req: Request, res: Response) => {
  try {
    // 1. Load latest N emails (e.g., last 10)
    const emails = await Email.find().sort({ date: -1 }).limit(10);

    if (!emails || emails.length === 0) {
      return res.status(404).json({ error: "No emails found in DB" });
    }

    // 2. Build prompt text
    const emailText = emails
      .map(
        (e) =>
          `Subject: ${e.subject}\nFrom: ${e.from}\nDate: ${e.date}\n${e.body}`
      )
      .join("\n\n");

    const prompt = `Summarize the following emails into a short digest:\n\n${emailText}`;

    // 3. Call Gemini
    const summary = await summarizeText(prompt);

    // 4. Return both summary + raw emails if needed
    res.json({
      summary,
      emails,
    });
  } catch (err) {
    console.error("Error summarizing emails:", err);
    res.status(500).json({ error: "Failed to summarize emails" });
  }
};
