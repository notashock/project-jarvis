// src/services/gmailService.ts
import { google } from "googleapis";
import { User } from "../models/user.js";
import Email from "../models/Email.js";
/**
 * Initialize an authenticated Gmail client for a given user
 */
const getGmailClient = async (googleId) => {
    const user = await User.findOne({ googleId });
    if (!user) {
        throw new Error(`No user found with googleId: ${googleId}`);
    }
    if (!user.refreshToken) {
        throw new Error(`No refresh token found for user: ${googleId}`);
    }
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REDIRECT_URI) {
        throw new Error("Missing Google OAuth environment variables");
    }
    const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
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
export const fetchTodaysEmails = async (googleId, maxResults = 5) => {
    try {
        const { gmail, user } = await getGmailClient(googleId);
        // List recent inbox messages
        const listRes = await gmail.users.messages.list({
            userId: "me",
            maxResults,
            labelIds: ["INBOX"],
        });
        const messages = listRes.data.messages || [];
        if (messages.length === 0)
            return [];
        const savedEmails = [];
        for (const msg of messages) {
            const messageId = msg.id;
            if (!messageId)
                continue;
            // Skip if already stored
            const exists = await Email.findOne({ gmailMessageId: messageId });
            if (exists)
                continue;
            // Fetch full message details
            const msgRes = await gmail.users.messages.get({
                userId: "me",
                id: messageId,
                format: "full",
            });
            const payload = msgRes.data?.payload;
            if (!payload)
                continue;
            const headers = payload.headers || [];
            const subject = headers.find((h) => h.name?.toLowerCase() === "subject")?.value ||
                "No Subject";
            const from = headers.find((h) => h.name?.toLowerCase() === "from")?.value ||
                "Unknown";
            // Parse body (text/html preferred, fallback to text/plain, fallback to base64 body)
            const findBodyPart = (parts) => {
                for (const part of parts) {
                    if (part.mimeType === "text/html" && part.body?.data) {
                        return part.body.data;
                    }
                    if (part.parts?.length) {
                        const subResult = findBodyPart(part.parts);
                        if (subResult) return subResult;
                    }
                }
                for (const part of parts) {
                    if (part.mimeType === "text/plain" && part.body?.data) {
                        return part.body.data;
                    }
                }
                return null;
            };
            let body = "";
            if (payload.parts?.length) {
                const b64Data = findBodyPart(payload.parts);
                if (b64Data) {
                    body = Buffer.from(b64Data, "base64").toString("utf8");
                }
                else {
                    const plainPart = payload.parts.find((p) => p.mimeType === "text/plain");
                    const plainData = plainPart?.body?.data;
                    if (plainData)
                        body = Buffer.from(plainData, "base64").toString("utf8");
                }
            }
            else if (payload.body?.data) {
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
    }
    catch (err) {
        console.error("Error in fetchTodaysEmails:", err);
        throw new Error("Failed to fetch today's emails: " + (err?.message || JSON.stringify(err)));
    }
};
//# sourceMappingURL=gmailService.js.map