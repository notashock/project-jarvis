// src/services/gmailService.ts
import { google } from "googleapis";
import { User } from "../models/user.js";
import type { IEmail } from "../models/Email.js";
import Email from "../models/Email.js";

/**
 * Initialize an authenticated Gmail client for a given user
 */
const getGmailClient = async (googleId: string) => {
  const user = await User.findOne({ googleId });
  if (!user) {
    throw new Error(`No user found with googleId: ${googleId}`);
  }
  if (!user.refreshToken) {
    throw new Error(`No refresh token found for user: ${googleId}`);
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken,
    expiry_date: user.tokenExpiry ?? null,
  });

  return {
    gmail: google.gmail({ version: "v1", auth: oauth2Client }),
    user,
  };
};

/**
 * Fetch today's inbox emails (deduplicated by gmailMessageId).
 * Marks them as read after saving.
 */
export const fetchTodaysEmails = async (
  googleId: string,
  maxResults: number = 10
): Promise<IEmail[]> => {
  try {
    const { gmail, user } = await getGmailClient(googleId);

    // List recent inbox messages
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

      // Fetch full message details
      const msgRes = await gmail.users.messages.get({
        userId: "me",
        id: messageId,
        format: "full",
      });

      const payload = msgRes.data?.payload;
      if (!payload) continue;

      const headers = payload.headers || [];
      const subject =
        headers.find((h) => h.name?.toLowerCase() === "subject")?.value ||
        "No Subject";
      const from =
        headers.find((h) => h.name?.toLowerCase() === "from")?.value ||
        "Unknown";

      // Parse body (text/plain preferred, fallback to base64 body)
      let body = "";
      if (payload.parts?.length) {
        const part = payload.parts.find((p) => p.mimeType === "text/plain");
        const data = part?.body?.data;
        if (data) body = Buffer.from(data, "base64").toString("utf8");
      } else if (payload.body?.data) {
        body = Buffer.from(payload.body.data, "base64").toString("utf8");
      }

      // Save email in DB
      const emailDoc = new Email({
        gmailMessageId: messageId,
        from,
        to: user.email,
        subject,
        body,
        date: new Date(),
        isRead: true,
        important: false,
      });

      await emailDoc.save();
      savedEmails.push(emailDoc);

      // Mark message as read in Gmail
      await gmail.users.messages.modify({
        userId: "me",
        id: messageId,
        requestBody: { removeLabelIds: ["UNREAD"] },
      });
    }

    return savedEmails;
  } catch (err: any) {
    console.error("Error in fetchTodaysEmails:", err.message);
    throw new Error("Failed to fetch today's emails");
  }
};
