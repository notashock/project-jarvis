// src/tools/authTools.ts
import { google } from "googleapis";
import dotenv from "dotenv";
import type { IToken } from "../../models/token.js";
import Token from "../../models/token.js";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

/**
 * Generate Google OAuth2 consent screen URL
 */
export const generateGoogleAuthUrl = () => {
  const scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // ensures refresh_token is returned
    prompt: "consent",      // forces refresh_token even if already authorized
    scope: scopes,
  });

  return { url };
};

/**
 * Handle Google callback: exchange code for tokens and save to DB
 */
export const handleGoogleAuthCallback = async (code: string) => {
  if (!code) throw new Error("Missing auth code");

  // 1. Exchange code for tokens
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // 2. Get user profile
  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  const userInfoResponse = await oauth2.userinfo.get();
  const data = userInfoResponse.data;

  if (!data || !data.id || !data.email) {
    throw new Error("Failed to get user info");
  }

  const googleId = data.id;
  const email = data.email;

  // 3. Prepare DB update
  const filter = { googleId };
  const update: Partial<IToken> = {
    googleId,
    email,
  };

  if (tokens.access_token) update.accessToken = tokens.access_token;
  if (tokens.expiry_date) update.tokenExpiry = tokens.expiry_date;

  // Only update refresh token if present (first auth or reconsent)
  if (tokens.refresh_token) update.refreshToken = tokens.refresh_token;

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // 4. Save tokens in DB
  const savedToken = await Token.findOneAndUpdate(filter, update, options);

  // 5. Return safe response (no refresh token exposed!)
  return {
    message: "Authentication successful",
    user: { googleId, email },
    tokenMeta: {
      hasRefreshToken: Boolean(tokens.refresh_token),
      expiry: tokens.expiry_date,
    },
  };
};
