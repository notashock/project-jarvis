// src/models/Material.ts
import { Schema, model, Document } from "mongoose";
const materialSchema = new Schema({
    courseId: { type: String, required: true }, // Changed from ObjectId to string
    materialId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    links: [String],
    fileUrl: String,
    topic: String,
}, { timestamps: true });
export const Material = model("Material", materialSchema);
//# sourceMappingURL=Material.js.map