import { fetchLatestEmail } from "../../services/gmailService.js";
import Email from "../../models/Email.js";
import Token from "../../models/token.js";

/**
 * Fetch and save the latest email for a given googleId
 */
export const getLatestEmail = async (googleId: string) => {
  if (!googleId) {
    throw new Error("Missing googleId parameter");
  }

  const email = await fetchLatestEmail(googleId);
  if (!email) {
    return null; // caller decides how to respond (404 or message)
  }

  // Check if email with the same subject already exists
  const exists = await Email.findOne({ subject: email.subject });
  if (exists) {
    return { message: "No new emails to save" };
  }

  const savedEmail = await Email.create({
    from: email.from,
    to: email.to ?? "me",
    subject: email.subject,
    body: email.body,
    date: email.date ?? new Date(),
    isRead: false,
  });

  return savedEmail;
};

/**
 * Fetch latest 20 emails from DB
 */
export const getAllEmails = async () => {
  return Email.find().sort({ date: -1 }).limit(20);
};

/**
 * Fetch all connected mail accounts from DB
 */
export const getConnectedMails = async () => {
  return Token.find({}, "email googleId");
};
