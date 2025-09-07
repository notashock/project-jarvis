// src/routes/auth.ts
import { Router } from "express";
import { redirectToGoogle, handleGoogleCallback } from "../controllers/authController.js";

const router = Router();

router.get("/google", redirectToGoogle);
router.get("/google/callback", handleGoogleCallback);

export default router;
