import { Schema, model, Document, Types } from "mongoose";

export interface ICourse extends Document {
  courseId: string;
  userId: Types.ObjectId;
  name?: string;
  section?: string;
  description?: string;
  room?: string;
  ownerId?: string;
  enrollmentCode?: string;
  courseState?: string;
}

const courseSchema = new Schema<ICourse>(
  {
    courseId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    section: String,
    description: String,
    room: String,
    ownerId: String,
    enrollmentCode: String,
    courseState: String,
  },
  { timestamps: true }
);

export const Course = model<ICourse>("Course", courseSchema);
