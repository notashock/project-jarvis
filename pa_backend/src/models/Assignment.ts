// src/models/Assignment.ts
import { Schema, model, Document } from "mongoose";

export interface IAssignment extends Document {
  courseId: string;              // The course this assignment belongs to
  courseworkId: string;           // Google Classroom ID
  title: string;                  // Name of the assignment
  instructions?: string;          // Optional detailed instructions
  topic?: string;                 // Topic or category
  maxPoints?: number;             // Maximum points for grading
  dueDate?: Date;                 // Full due date & time as single Date object
  materials?: {
    title?: string;
    fileUrl?: string;
    driveFileId?: string;
  }[];
  links?: string[];               // Any external links for assignment
  state?: "PUBLISHED" | "DRAFT" | "TURNED_IN"; // Assignment status from student POV
  submission?: {
    submittedAt?: Date;
    attachments?: {
      fileUrl: string;
      driveFileId?: string;
    }[];
    grade?: number;
    feedback?: string;
  };
}

const assignmentSchema = new Schema<IAssignment>(
  {
    courseId: { type: String, required: true },  // Changed from ObjectId to string
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
  },
  { timestamps: true }
);

export const Assignment = model<IAssignment>("Assignment", assignmentSchema);
