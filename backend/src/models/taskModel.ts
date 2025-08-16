import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  deadline: { type: Date, required: true },
  done: { type: Boolean, default: false }
}, { timestamps: true });

export default model("Task", taskSchema);
