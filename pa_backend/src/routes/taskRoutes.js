import express from "express";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../mcp/tools/taskTool.js";
import { fetchTodaysEmails } from "../services/gmailService.js";
import { summarizeEmailsWithTasks } from "../mcp/tools/geminiTool.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const router = express.Router();

router.post("/generate-from-emails", requireAuth, async (req, res) => {
    try {
        const googleId = req.user.googleId;
        const userEmail = req.user.email;
        // 1. Fetch up to 5 emails from Gmail API and save to DB
        await fetchTodaysEmails(googleId, 5);
        // 2. Read DB, send to Gemini, and generate tasks
        const result = await summarizeEmailsWithTasks(userEmail, 5);
        return successResponse(res, "Successfully generated tasks from emails", {
            taskCount: result.tasks.length,
            tasks: result.tasks
        });
    }
    catch (err) {
        return errorResponse(res, "Failed to generate tasks from emails", err, 500);
    }
});

router.post("/", async (req, res) => {
    try {
        const task = await createTask(req.body);
        return successResponse(res, "Task created successfully", task, 201);
    }
    catch (err) {
        return errorResponse(res, "Failed to create task", err, 500);
    }
});

router.get("/", async (_req, res) => {
    try {
        const tasks = await getTasks();
        return successResponse(res, "Tasks retrieved successfully", tasks);
    }
    catch (err) {
        return errorResponse(res, "Failed to retrieve tasks", err, 500);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const task = await getTaskById(req.params.id);
        if (!task) {
            return errorResponse(res, "Task not found", null, 404);
        }
        return successResponse(res, "Task retrieved successfully", task);
    }
    catch (err) {
        return errorResponse(res, "Failed to retrieve task", err, 500);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const task = await updateTask(req.params.id, req.body);
        if (!task) {
            return errorResponse(res, "Task not found to update", null, 404);
        }
        return successResponse(res, "Task updated successfully", task);
    }
    catch (err) {
        return errorResponse(res, "Failed to update task", err, 500);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await deleteTask(req.params.id);
        return successResponse(res, "Task deleted successfully", result);
    }
    catch (err) {
        return errorResponse(res, "Failed to delete task", err, 500);
    }
});

export default router;