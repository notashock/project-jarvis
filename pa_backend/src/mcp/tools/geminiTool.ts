import { geminiGenerate } from "../../mcp/clients/geminiClient.js";
import Email from "../../models/Email.js";
import Task from "../../models/Task.js";

export const summarizeEmailsWithTasks = async (limit = 10) => {
  const emails = await Email.find().sort({ date: -1 }).limit(limit);
  if (!emails || emails.length === 0) throw new Error("No emails found in DB");

  const emailContext = emails
    .map(
      (e) => `Subject: ${e.subject}\nFrom: ${e.from}\nDate: ${e.date}\n${e.body}`
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
       "source": "email"
     }
   ]

Rules:
- Only include actionable items in "taskSummary".
- Do not invent tasks.
- "status" must always be "pending".
- "source" must always be "email".
- If no due date is mentioned, set "dueDate" = null.

Return a single JSON object with the two keys: { "normalSummary": string, "taskSummary": Task[] }

Emails:
${emailContext}
`;

  let response: string = "";
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

  let parsed: { normalSummary: string; taskSummary: any[] } = {
    normalSummary: "",
    taskSummary: [],
  };

  try {
    const cleaned = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
      const raw = JSON.parse(cleaned);
      parsed = JSON.parse(JSON.stringify(raw));
    } else {
      console.error("Gemini response not valid JSON:", cleaned);
    }
  } catch (err) {
    console.error("Failed to parse Gemini response:", err);
  }

  const savedTasks: any[] = [];

  if (parsed && Array.isArray(parsed.taskSummary)) {
    for (const task of parsed.taskSummary) {
      if (!task || !task.description) continue;

      const dueDate = task.dueDate ? new Date(task.dueDate) : null;

      try {
        // check for duplicate (same description + dueDate)
        const existing = await Task.findOne({
          description: task.description,
          dueDate: dueDate,
        });

        if (!existing) {
          // Attempt to find a matching email for this task
          // Here we use the most recent email that contains the task description
          const emailDoc = await Email.findOne({
            subject: { $regex: task.description, $options: "i" },
          }).sort({ date: -1 });
          console.log("Matched email for task:", emailDoc);
          const newTask = new Task({
            description: task.description,
            dueDate: dueDate,
            status: "pending",
            source: "email",
            gmailId: emailDoc?._id, // assign MongoDB id if available
          });

          // Save task
          const savedTask = await newTask.save();
          savedTasks.push(savedTask);

          // Mark the corresponding email as important
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
