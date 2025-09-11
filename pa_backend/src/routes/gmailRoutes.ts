import express from "express";
import {
  getLatestEmail,
  getAllEmails,
  getConnectedMails,
} from "../mcp/tools/gmailTool.js";

const router = express.Router();

router.get("/latest/:googleId", async (req, res, next) => {
  try {
    const email = await getLatestEmail(req.params.googleId);
    if (!email) return res.status(404).json({ message: "No new emails found" });
    res.json(email);
  } catch (err: any) {
    next(err);
  }
});

router.get("/all", async (_req, res, next) => {
  try {
    const emails = await getAllEmails();
    res.json(emails);
  } catch (err: any) {
    next(err);
  }
});

router.get("/accounts", async (_req, res, next) => {
  try {
    const accounts = await getConnectedMails();
    res.json(accounts);
  } catch (err: any) {
    next(err);
  }
});

export default router;
