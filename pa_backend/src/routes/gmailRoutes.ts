import { Router } from "express";
import { getAllEmails, getLatestEmail } from "../controllers/gmailController.js";

const router = Router();

router.get("/latest/:googleId", getLatestEmail);
router.get("/all", getAllEmails);

export default router;
