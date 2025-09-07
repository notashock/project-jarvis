import { Router } from "express";
import { getLatestEmail } from "../controllers/gmailController.js";

const router = Router();

router.get("/latest/:googleId", getLatestEmail);

export default router;
