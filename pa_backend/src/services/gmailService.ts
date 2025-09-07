// src/services/gmailService.ts
import { google, gmail_v1 } from "googleapis";
import Token from "../models/token.js";
import Email from "../models/Email.js";

/**
 * Fetch the latest email for a given Google user ID,
 * save it to MongoDB, and return the saved document.
 */
export async function fetchLatestEmail(googleId: string) {
  // 1. Get tokens from DB
  const tokenDoc = await Token.findOne({ googleId });
  if (!tokenDoc?.refreshToken) throw new Error("No refresh token found");

  // 2. Set up OAuth2 client
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
  );
  oauth2Client.setCredentials({ refresh_token: tokenDoc.refreshToken });

  // 3. Create Gmail API instance
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  // 4. List latest email (1 email)
  const listRes: gmail_v1.Schema$ListMessagesResponse =
    (await gmail.users.messages.list({
      userId: "me",
      maxResults: 1,
      labelIds: ["INBOX"],
      q: "is:unread",
    })).data;

  const messages = listRes.messages;

  // ✅ Runtime check to prevent "possibly undefined" errors
  if (!messages || messages.length === 0 || !messages[0]?.id) return null;

  const messageId = messages[0].id;

  // 5. Get full message
  const msgRes = await gmail.users.messages.get({
    userId: "me",
    id: messageId,
    format: "full",
  });

  // ✅ Check payload exists
  const payload = msgRes.data?.payload;
  if (!payload) return null;

  const headers = payload.headers || [];

  // 6. Extract headers safely
  const subject =
    headers.find((h) => h.name === "Subject")?.value || "No Subject";

  const from = headers.find((h) => h.name === "From")?.value || "Unknown";

  // 7. Extract body safely
  let body = "";

  if (payload.parts && payload.parts.length > 0) {
    const part = payload.parts[0];
    const data = part?.body?.data;
    if (data) {
      body = Buffer.from(data, "base64").toString();
    }
  } else if (payload.body?.data) {
    body = Buffer.from(payload.body.data, "base64").toString();
  }

  // 8. Save email to MongoDB
  const emailDoc = new Email({
    from,
    to: tokenDoc.email,
    subject,
    body,
    date: new Date(),
    isRead: false,
  });

  await emailDoc.save();
  return emailDoc;
}
