// src/routes/geminiRoutes.ts
import express from "express";
import { summarizeEmails } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/summarize", summarizeEmails);

export default router;
