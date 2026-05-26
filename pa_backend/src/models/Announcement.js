// src/models/Announcement.ts
import { Schema, model, Document } from "mongoose";
const announcementSchema = new Schema({
    courseId: { type: String, required: true }, // Changed here
    announcementId: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    materials: [
        {
            title: String,
            fileUrl: String,
            driveFileId: String,
        },
    ],
    links: [String],
    fileUrl: String,
    scheduledTime: Date,
}, { timestamps: true });
export const Announcement = model("Announcement", announcementSchema);
//# sourceMappingURL=Announcement.js.map