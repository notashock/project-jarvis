import { Router } from "express";
import { getAllEmails, getConnectedMails, getLatestEmail } from "../controllers/gmailController.js";

const router = Router();

router.get("/latest/:googleId", getLatestEmail);
router.get("/all", getAllEmails);
router.get("/accounts", getConnectedMails);

export default router;
