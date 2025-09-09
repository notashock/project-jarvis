import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  description: string;
  dueDate?: Date;
  status: "pending" | "done";
  source: "manual" | "email" | "other";
}

const taskSchema = new Schema<ITask>(
  {
    description: { type: String, required: true },
    dueDate: { type: Date },
    status: { type: String, enum: ["pending", "done"], default: "pending" },
    source: {
      type: String,
      enum: ["manual", "email", "other"],
      default: "manual",
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);
