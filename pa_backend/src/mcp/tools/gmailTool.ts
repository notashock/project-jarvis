import { fetchTodaysEmails } from "../../services/gmailService.js";
import type { IEmail } from "../../models/Email.js";
import EmailModel from "../../models/Email.js";
import Token from "../../models/token.js";

/**
 * Fetch and return today's emails for a given googleId
 */
export const getTodaysEmails = async (
  googleId: string
): Promise<IEmail[] | { message: string }> => {
  if (!googleId) {
    throw new Error("Missing googleId parameter");
  }

  const emails: IEmail[] = await fetchTodaysEmails(googleId);

  if (!emails || emails.length === 0) {
    return { message: "No new emails to save" };
  }

  return emails; // ✅ no duplicate check or re-saving
};

/**
 * Fetch latest 20 emails from DB
 */
export const getAllEmails = async (): Promise<IEmail[]> => {
  return EmailModel.find().sort({ date: -1 }).limit(20);
};

/**
 * Fetch all connected mail accounts from DB
 */
export const getConnectedMails = async (): Promise<
  { email: string; googleId: string }[]
> => {
  return Token.find({}, "email googleId");
};
