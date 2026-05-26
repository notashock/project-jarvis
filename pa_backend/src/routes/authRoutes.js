import express from "express";
import { generateGoogleAuthUrl, handleGoogleAuthCallback, } from "../mcp/tools/authTool.js";
const router = express.Router();
// Redirect to Google consent screen
router.get("/google", (req, res, next) => {
    try {
        const { url } = generateGoogleAuthUrl();
        res.redirect(url);
    }
    catch (err) {
        next(err);
    }
});
// Google OAuth2 callback
router.get("/google/callback", async (req, res, next) => {
    try {
        const code = req.query.code;
        const result = await handleGoogleAuthCallback(code);
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        res.redirect(`${frontendUrl}/accounts/callback?token=${result.token}`);
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=authRoutes.js.map