import { Schema, model, Document } from "mongoose";
const userSchema = new Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    tokenExpiry: { type: Number }, // <-- added
    selectedCourses: [{ type: String }],
}, { timestamps: true });
export const User = model("User", userSchema);
//# sourceMappingURL=user.js.map