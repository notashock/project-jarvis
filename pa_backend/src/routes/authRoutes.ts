import express from "express";
import {
  generateGoogleAuthUrl,
  handleGoogleAuthCallback,
} from "../mcp/tools/authTool.js";

const router = express.Router();

// Redirect to Google consent screen
router.get("/google", (req, res, next) => {
  try {
    const { url } = generateGoogleAuthUrl();
    res.redirect(url);
  } catch (err: any) {
    next(err);
  }
});

// Google OAuth2 callback
router.get("/google/callback", async (req, res, next) => {
  try {
    const code = req.query.code as string;
    const result = await handleGoogleAuthCallback(code);
    res.json(result);
  } catch (err: any) {
    next(err);
  }
});

export default router;
