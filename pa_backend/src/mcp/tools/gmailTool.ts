import { fetchTodaysEmails } from "../../services/gmailService.js";
import type { IEmail } from "../../models/Email.js";
import EmailModel from "../../models/Email.js";
import { User } from "../../models/user.js";

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
  const emails = await EmailModel.find().sort({ date: -1 }).limit(20);
  return emails || [];
};

/**
 * Fetch all connected mail accounts from DB
 */
export const getConnectedMails = async (): Promise<
  { email: string; googleId: string }[]
> => {
  const users = await User.find({}, "email googleId");
  return users.map(u => ({
    email: u.email ?? "",
    googleId: u.googleId ?? "",
  }));
};
