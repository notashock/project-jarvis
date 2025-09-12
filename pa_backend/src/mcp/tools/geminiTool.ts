import { geminiGenerate } from "../../mcp/clients/geminiClient.js";
import Email from "../../models/Email.js";
import Task from "../../models/Task.js";

export const summarizeEmailsWithTasks = async (limit = 10) => {
  const emails = await Email.find().sort({ date: -1 }).limit(limit);
  if (!emails || emails.length === 0) throw new Error("No emails found in DB");

  const emailContext = emails
    .map(
      (e) => `
GmailMessageId: ${e.gmailMessageId}
Subject: ${e.subject}
From: ${e.from}
Date: ${e.date}
Body: ${e.body}`
    )
    .join("\n\n");

  const prompt = `
You are an assistant that processes emails.
Produce a summary with TWO sections:

1. "normalSummary": A human-readable bullet-point summary of the emails.
2. "taskSummary": A JSON array of tasks strictly following this schema:
   [
     {
       "description": "string",
       "dueDate": "YYYY-MM-DD" | null,
       "status": "pending",
       "source": "email",
       "gmailMessageId": "string" // must match the email above
     }
   ]

Rules:
- Always include the correct "gmailMessageId" for each task.
- Only include actionable items.
- Do not invent tasks.
- "status" must always be "pending".
- "source" must always be "email".
- If no due date is mentioned, use null.

Return a single JSON object with the keys:
{ "normalSummary": string, "taskSummary": Task[] }

Emails:
${emailContext}
`;

  let response = "";
  try {
    response = await geminiGenerate(prompt);
  } catch (err) {
    console.error("Gemini API failed:", err);
    return { summary: "", tasks: [], emails };
  }

  if (!response || typeof response !== "string") {
    console.error("Gemini returned empty or invalid response");
    return { summary: "", tasks: [], emails };
  }

  let parsed = { normalSummary: "", taskSummary: [] as any[] };
  try {
    const cleaned = response.replace(/```json/gi, "").replace(/```/g, "").trim();
    if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
      parsed = JSON.parse(cleaned);
    } else {
      console.error("Gemini response not valid JSON:", cleaned);
    }
  } catch (err) {
    console.error("Failed to parse Gemini response:", err);
  }

  const savedTasks: any[] = [];

  if (parsed && Array.isArray(parsed.taskSummary)) {
    for (const task of parsed.taskSummary) {
      if (!task?.description || !task?.gmailMessageId) continue;

      const dueDate = task.dueDate ? new Date(task.dueDate) : null;

      try {
        const emailDoc = await Email.findOne({ gmailMessageId: task.gmailMessageId });

        // duplicate check: same description + dueDate + gmailMessageId
        const existing = await Task.findOne({
          description: task.description,
          dueDate,
          gmailMessageId: task.gmailMessageId,
        });

        if (!existing) {
          const newTask = new Task({
            description: task.description,
            dueDate,
            status: "pending",
            source: "email",
            gmailMessageId: task.gmailMessageId,
            gmailRef: emailDoc?._id,
          });

          const savedTask = await newTask.save();
          savedTasks.push(savedTask);

          if (emailDoc) {
            await Email.findByIdAndUpdate(emailDoc._id, { important: true });
          }
        }
      } catch (dbErr) {
        console.error("Error saving task:", dbErr);
      }
    }
  }

  return {
    summary: parsed.normalSummary || "",
    tasks: savedTasks,
    emails,
  };
};
