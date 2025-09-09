import type { Request, Response } from "express";
import { fetchLatestEmail } from "../services/gmailService.js";
import Email from "../models/Email.js";
import token from "../models/token.js";

// ✅ Fetch and save latest email from Gmail API
export const getLatestEmail = async (req: Request, res: Response) => {
  try {
    const googleId = req.params.googleId;

    if (!googleId) {
      return res.status(400).json({ error: "Missing googleId parameter" });
    }

    const email = await fetchLatestEmail(googleId);
    if (!email) {
      return res.status(404).json({ message: "No new emails found" });
    }

    // 🔎 Check if an email with the same subject already exists
    const exists = await Email.findOne({ subject: email.subject });
    if (exists) {
      return res.status(200).json({ message: "No new emails to save" });
    }
    else {
      const savedEmail = await Email.create({
        from: email.from,
        to: email.to ?? "me",
        subject: email.subject,
        body: email.body,
        date: email.date ?? new Date(),
        isRead: false
      });

      res.json(savedEmail);
    }
  } catch (err) {
    console.error("Error fetching latest email:", err);
    res.status(500).json({ error: "Failed to fetch email", details: err });
  }
};


// ✅ Fetch all emails from DB
export const getAllEmails = async (req: Request, res: Response) => {
  try {
    const emails = await Email.find().sort({ date: -1 }).limit(20); // latest 20
    res.json(emails);
  } catch (err) {
    console.error("Error fetching emails from DB:", err);
    res.status(500).json({ error: "Failed to fetch emails", details: err });
  }
};

export const getConnectedMails = async (req: Request, res: Response) => {
  try {
    const email = await token.find({}, "email googleId");
    res.json(email);
  } catch (err) {
    console.error("Error fetching connected mails from DB:", err);
    res.status(500).json({ error: "Failed to fetch connected mails", details: err });
  }
};
