// src/models/Assignment.ts
import { Schema, model, Document } from "mongoose";
const assignmentSchema = new Schema({
    courseId: { type: String, required: true }, // Changed from ObjectId to string
    courseworkId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    instructions: String,
    topic: String,
    maxPoints: Number,
    dueDate: Date,
    materials: [
        {
            title: String,
            fileUrl: String,
            driveFileId: String,
        },
    ],
    links: [String],
    state: { type: String, enum: ["PUBLISHED", "DRAFT", "TURNED_IN"], default: "PUBLISHED" },
    submission: {
        submittedAt: Date,
        attachments: [
            {
                fileUrl: String,
                driveFileId: String,
            },
        ],
        grade: Number,
        feedback: String,
    },
}, { timestamps: true });
export const Assignment = model("Assignment", assignmentSchema);
//# sourceMappingURL=Assignment.js.map