import { google, gmail_v1 } from "googleapis";
import Token from "../models/token.js";
import type { IEmail } from "../models/Email.js";
import Email from "../models/Email.js";

export async function fetchTodaysEmails(googleId: string): Promise<IEmail[]> {
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

  // 4. List emails from last 24h
  const listRes: gmail_v1.Schema$ListMessagesResponse =
    (
      await gmail.users.messages.list({
        userId: "me",
        maxResults: 20, // adjust as needed
        labelIds: ["INBOX"],
        q: "newer_than:1d",
      })
    ).data;

  const messages = listRes.messages || [];
  if (messages.length === 0) return [];

  const savedEmails: IEmail[] = [];

  for (const msg of messages) {
    const messageId = msg.id;
    if (!messageId) continue;

    // ✅ Check if already in DB by messageId
    const exists = await Email.findOne({ gmailMessageId: messageId });
    if (exists) continue;

    // 5. Get full message
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
    const from = headers.find((h) => h.name === "From")?.value || "Unknown";

    let body = "";
    if (payload.parts && payload.parts.length > 0) {
      const part = payload.parts.find((p) => p.mimeType === "text/plain");
      const data = part?.body?.data;
      if (data) body = Buffer.from(data, "base64").toString("utf8");
    } else if (payload.body?.data) {
      body = Buffer.from(payload.body.data, "base64").toString("utf8");
    }

    // 6. Save to MongoDB
    const emailDoc = new Email({
      gmailMessageId: messageId, // ✅ store unique ID
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

    // 7. Mark email as read in Gmail
    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      requestBody: { removeLabelIds: ["UNREAD"] },
    });
  }

  return savedEmails;
}
