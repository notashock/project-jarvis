import { Schema, model, Document, Types } from "mongoose";
const courseSchema = new Schema({
    courseId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    section: String,
    description: String,
    room: String,
    ownerId: String,
    enrollmentCode: String,
    courseState: String,
}, { timestamps: true });
export const Course = model("Course", courseSchema);
//# sourceMappingURL=Course.js.map