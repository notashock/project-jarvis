import express from "express";
import { getTodaysEmails, getAllEmails, getConnectedMails } from "../mcp/tools/gmailTool.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const router = express.Router();

router.get("/latest", requireAuth, async (req, res) => {
    try {
        const emails = await getTodaysEmails(req.user.googleId);
        if (!emails || emails.message) {
            return successResponse(res, "No new emails found", [], 200);
        }
        return successResponse(res, "Latest emails fetched successfully", emails);
    }
    catch (err) {
        return errorResponse(res, "Failed to fetch latest emails", err, 500);
    }
});

router.get("/all", async (_req, res) => {
    try {
        const emails = await getAllEmails();
        return successResponse(res, "All saved emails retrieved successfully", emails);
    }
    catch (err) {
        return errorResponse(res, "Failed to retrieve saved emails", err, 500);
    }
});

router.get("/accounts", async (_req, res) => {
    try {
        const accounts = await getConnectedMails();
        return successResponse(res, "Connected accounts retrieved successfully", accounts);
    }
    catch (err) {
        return errorResponse(res, "Failed to retrieve connected accounts", err, 500);
    }
});

export default router;