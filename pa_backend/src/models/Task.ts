import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
  description: string;
  dueDate?: Date;
  status: "pending" | "done";
  source: "manual" | "email" | "other";
  gmailMessageId?: string;   // external Gmail ID
  gmailRef?: Types.ObjectId; // reference to Email doc
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
    gmailMessageId: {
      type: String,
      required: function () {
        return this.source === "email";
      },
    },
    gmailRef: {
      type: Schema.Types.ObjectId,
      ref: "Email",
      required: function () {
        return this.source === "email";
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);
