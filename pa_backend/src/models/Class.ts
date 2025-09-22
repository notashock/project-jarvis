import mongoose, { Document, Schema } from "mongoose";

/**
 * Interface for a Class document
 */
export interface IClass extends Document {
  googleId: string; // Unique Google Classroom course ID
  name: string;
  section?: string;
  description?: string;
  room?: string;
  ownerId: string; // Teacher's Google ID
  enrollmentCode?: string;
  courseState?: string; // ACTIVE, ARCHIVED, etc.
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose Schema
 */
const ClassSchema: Schema = new Schema<IClass>(
  {
    googleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    section: { type: String },
    description: { type: String },
    room: { type: String },
    ownerId: { type: String, required: true },
    enrollmentCode: { type: String },
    courseState: {
      type: String,
      enum: ["ACTIVE", "ARCHIVED", "PROVISIONED", "DECLINED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

/**
 * Mongoose Model
 */
export const ClassModel = mongoose.model<IClass>("Class", ClassSchema);
