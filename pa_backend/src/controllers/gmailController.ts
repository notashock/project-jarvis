// src/controllers/gmailController.ts
import type { Request, Response } from "express";
import { fetchLatestEmail } from "../services/gmailService.js";

export const getLatestEmail = async (req: Request, res: Response) => {
  try {
    const googleId = req.params.googleId;

    // ✅ Runtime check for missing Google ID
    if (!googleId) {
      return res.status(400).json({ error: "Missing googleId parameter" });
    }

    const email = await fetchLatestEmail(googleId);
    if (!email) {
      return res.status(404).json({ message: "No new emails found" });
    }

    res.json(email);
  } catch (err) {
    console.error("Error fetching latest email:", err);
    res.status(500).json({ error: "Failed to fetch email", details: err });
  }
};
