// src/controllers/authController.ts
import type { Request, Response } from "express";
import { google } from "googleapis";
import type { IToken } from "../models/token.js";
import Token from "../models/token.js";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Redirect user to Google consent screen
export const redirectToGoogle = (req: Request, res: Response) => {
  const scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // ensures refresh_token is returned
    prompt: "consent",      // forces refresh_token even if user already authorized
    scope: scopes,
  });

  res.redirect(url);
};

// Handle Google callback and save tokens
export const handleGoogleCallback = async (req: Request, res: Response) => {
  try {
    // 1. Get auth code from query
    const code = req.query.code as string;
    if (!code) return res.status(400).send("Missing auth code");

    // 2. Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // 3. Get user profile info
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const userInfoResponse = await oauth2.userinfo.get();
    const data = userInfoResponse.data;

    if (!data || !data.id || !data.email) {
      return res.status(400).send("Failed to get user info");
    }

    const googleId = data.id;
    const email = data.email;

    // 4. Prepare DB update
    const filter = { googleId };
    const update: Partial<IToken> = {};
      if (tokens.access_token) update.accessToken = tokens.access_token;
      if (tokens.expiry_date) update.tokenExpiry = tokens.expiry_date;
      update.googleId = googleId;
      update.email = email;


    // Only update refresh token if present (first auth or user reconsented)
    if (tokens.refresh_token) update.refreshToken = tokens.refresh_token;

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // 5. Save or update tokens in DB
    const savedToken = await Token.findOneAndUpdate(filter, update, options);

    res.json({
      message: "Authentication successful",
      user: { googleId, email },
      tokens: savedToken,
    });
  } catch (err) {
    console.error("Error in Google callback:", err);
    res.status(500).send("Authentication failed");
  }
};
