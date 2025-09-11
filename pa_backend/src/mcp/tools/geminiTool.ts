import { summarizeText as geminiSummarize } from "../../mcp/clients/geminiClient.js";
import Email from "../../models/Email.js";

/**
 * Summarize latest N emails in DB
 * @param limit - number of latest emails to summarize (default 10)
 * @returns { summary: string, emails: Email[] }
 */
export const summarizeEmails = async () => {
  // 1. Load latest N emails
  const emails = await Email.find().sort({ date: -1 });

  if (!emails || emails.length === 0) {
    throw new Error("No emails found in DB");
  }

  // 2. Build prompt text for Gemini
  const emailText = emails
    .map(
      (e) => `Subject: ${e.subject}\nFrom: ${e.from}\nDate: ${e.date}\n${e.body}`
    )
    .join("\n\n");

  const prompt = `Summarize the following emails into a short digest:\n\n${emailText}`;

  // 3. Call Gemini client
  const summary = await geminiSummarize(prompt);

  // 4. Return both summary + raw emails
  return { summary, emails };
};
