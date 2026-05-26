import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getJwtSecret = () => process.env.JWT_SECRET || "default_secret";

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: Missing token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, getJwtSecret());
        // Attach user to request object
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};