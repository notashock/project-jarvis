// src/services/gmailService.ts
import { google } from "googleapis";
import Token from "../models/token.js";
import type { IEmail } from "../models/Email.js";
import Email from "../models/Email.js";

/**
 * Get an authenticated Gmail client for a user
 */
const getGmailClient = async (googleId: string) => {
  const tokenDoc = await Token.findOne({ googleId });
  if (!tokenDoc?.refreshToken) {
    throw new Error("No refresh token found for this user");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: tokenDoc.accessToken,
    refresh_token: tokenDoc.refreshToken,
    expiry_date: tokenDoc.tokenExpiry,
  });

  return { gmail: google.gmail({ version: "v1", auth: oauth2Client }), tokenDoc };
};

/**
 * Fetch inbox emails (latest N messages, deduplicate by gmailMessageId)
 */
export const fetchTodaysEmails = async (
  googleId: string,
  maxResults: number = 10
): Promise<IEmail[]> => {
  const { gmail, tokenDoc } = await getGmailClient(googleId);

  // List messages
  const listRes = await gmail.users.messages.list({
    userId: "me",
    maxResults,
    labelIds: ["INBOX"],
  });

  const messages = listRes.data.messages || [];
  if (messages.length === 0) return [];

  const savedEmails: IEmail[] = [];

  for (const msg of messages) {
    const messageId = msg.id;
    if (!messageId) continue;

    // Skip if already stored
    const exists = await Email.findOne({ gmailMessageId: messageId });
    if (exists) continue;

    // Fetch full message
    const msgRes = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "full",
    });

    const payload = msgRes.data?.payload;
    if (!payload) continue;

    const headers = payload.headers || [];
    const subject =
      headers.find((h) => h.name === "Subject")?.value || "No Subject";
    const from =
      headers.find((h) => h.name === "From")?.value || "Unknown";

    let body = "";
    if (payload.parts && payload.parts.length > 0) {
      const part = payload.parts.find((p) => p.mimeType === "text/plain");
      const data = part?.body?.data;
      if (data) body = Buffer.from(data, "base64").toString("utf8");
    } else if (payload.body?.data) {
      body = Buffer.from(payload.body.data, "base64").toString("utf8");
    }

    // Save email
    const emailDoc = new Email({
      gmailMessageId: messageId,
      from,
      to: tokenDoc.email,
      subject,
      body,
      date: new Date(),
      isRead: true,
      important: false,
    });
    await emailDoc.save();
    savedEmails.push(emailDoc);

    // Mark as read
    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      requestBody: { removeLabelIds: ["UNREAD"] },
    });
  }

  return savedEmails;
};
