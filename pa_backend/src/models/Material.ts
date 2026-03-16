// src/models/Material.ts
import { Schema, model, Document } from "mongoose";

export interface IMaterial extends Document {
  courseId: string;        // Changed from Types.ObjectId to string
  materialId: string;
  title: string;
  description?: string;
  links?: string[];
  fileUrl?: string;       // Direct link to file for quick access
  topic?: string;
}

const materialSchema = new Schema<IMaterial>(
  {
    courseId: { type: String, required: true },  // Changed from ObjectId to string
    materialId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    links: [String],
    fileUrl: String,
    topic: String,
  },
  { timestamps: true }
);

export const Material = model<IMaterial>("Material", materialSchema);
