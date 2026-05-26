import { geminiGenerate } from "../../mcp/clients/geminiClient.js";
import Email from "../../models/Email.js";
import Task from "../../models/Task.js";

const cleanAndTruncateBody = (body) => {
    if (!body) return "";
    // Strip HTML markup
    const stripped = body.replace(/<[^>]*>/g, " ");
    // Normalize spaces and truncate
    const normalized = stripped.replace(/\s+/g, " ").trim();
    if (normalized.length <= 500) {
        return normalized;
    }
    return normalized.substring(0, 500) + "...";
};

const makePromptForEmail = (email) => {
    const cleanBody = cleanAndTruncateBody(email.body);
    return `
You are an assistant that processes emails. Analyze the following email:

GmailMessageId: ${email.gmailMessageId}
Subject: ${email.subject}
From: ${email.from}
Date: ${email.date}
Body: ${cleanBody}

Produce a summary with TWO sections:
1. "normalSummary": A human-readable summary of this email in 1-2 sentences.
2. "taskSummary": A JSON array of tasks strictly following this schema:
   [
     {
       "description": "string",
       "dueDate": "YYYY-MM-DD" | null,
       "status": "pending",
       "source": "email",
       "gmailMessageId": "string" // must match ${email.gmailMessageId}
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
`;
};

export const summarizeEmailsWithTasks = async (userEmail, limit = 5) => {
    const emails = await Email.find({ to: userEmail }).sort({ date: -1 }).limit(limit);
    if (!emails || emails.length === 0)
        throw new Error("No emails found in DB");

    const combinedSummary = [];
    const savedTasks = [];

    for (let i = 0; i < emails.length; i++) {
        const email = emails[i];
        
        // Cooldown between Gemini requests (4000ms delay)
        if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 4000));
        }

        const prompt = makePromptForEmail(email);
        let response = "";
        try {
            response = await geminiGenerate(prompt);
        }
        catch (err) {
            console.error(`Gemini API failed for email ${email.gmailMessageId}:`, err);
            continue;
        }

        if (!response || typeof response !== "string") {
            console.error(`Gemini returned empty or invalid response for email ${email.gmailMessageId}`);
            continue;
        }

        let parsed = { normalSummary: "", taskSummary: [] };
        try {
            const cleaned = response.replace(/```json/gi, "").replace(/```/g, "").trim();
            if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
                parsed = JSON.parse(cleaned);
            }
            else {
                console.error("Gemini response not valid JSON:", cleaned);
            }
        }
        catch (err) {
            console.error("Failed to parse Gemini response:", err);
        }

        if (parsed.normalSummary) {
            combinedSummary.push(`- ${parsed.normalSummary}`);
        }

        if (parsed && Array.isArray(parsed.taskSummary)) {
            for (const task of parsed.taskSummary) {
                if (!task?.description || !task?.gmailMessageId)
                    continue;
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
                }
                catch (dbErr) {
                    console.error("Error saving task:", dbErr);
                }
            }
        }
    }

    return {
        summary: combinedSummary.join("\n") || "",
        tasks: savedTasks,
        emails,
    };
};