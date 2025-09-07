import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  emailId: mongoose.Types.ObjectId;
  description: string;
  dueDate?: Date;
  status: "pending" | "done";
}

const taskSchema = new Schema<ITask>({
  emailId: { type: Schema.Types.ObjectId, ref: "Email", required: true },
  description: { type: String, required: true },
  dueDate: { type: Date },
  status: { type: String, default: "pending" },
});

export default mongoose.model<ITask>("Task", taskSchema);
