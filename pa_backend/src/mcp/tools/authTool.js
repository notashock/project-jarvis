// src/tools/authTools.ts
import { google } from "googleapis";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.js";
dotenv.config();
const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
export const generateGoogleAuthUrl = () => {
    const scopes = [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.send",
        "https://www.googleapis.com/auth/gmail.modify",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/classroom.courses.readonly",
        "https://www.googleapis.com/auth/classroom.announcements.readonly",
        "https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly",
        "https://www.googleapis.com/auth/classroom.coursework.me",
        "https://www.googleapis.com/auth/classroom.rosters.readonly",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive.readonly",
    ];
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: scopes,
    });
    return { url };
};
export const handleGoogleAuthCallback = async (code) => {
    if (!code)
        throw new Error("Missing auth code");
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const data = (await oauth2.userinfo.get()).data;
    if (!data || !data.id || !data.email)
        throw new Error("Failed to get user info");
    const googleId = data.id;
    const email = data.email;
    const filter = { googleId };
    const update = {
        googleId,
        email,
    };
    if (tokens.access_token)
        update.accessToken = tokens.access_token;
    if (tokens.expiry_date)
        update.tokenExpiry = tokens.expiry_date;
    if (tokens.refresh_token)
        update.refreshToken = tokens.refresh_token;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const savedUser = await User.findOneAndUpdate(filter, update, options);
    const jwtToken = jwt.sign({ googleId, email }, process.env.JWT_SECRET || "default_secret", { expiresIn: "7d" });
    return {
        message: "Authentication successful",
        user: { googleId, email },
        token: jwtToken,
        tokenMeta: {
            hasRefreshToken: Boolean(tokens.refresh_token),
            expiry: tokens.expiry_date,
        },
    };
};
export const getAuthorizedClient = async (googleId) => {
    const user = await User.findOne({ googleId });
    if (!user)
        throw new Error("User not found");
    oauth2Client.setCredentials({
        access_token: user.accessToken,
        refresh_token: user.refreshToken,
        expiry_date: user.tokenExpiry ?? null,
    });
    return oauth2Client;
};
//# sourceMappingURL=authTool.js.map