import mongoose, { Schema, Document } from "mongoose";

export interface IEmail extends Document {
  from: string;
  to: string;
  subject: string;
  body: string;
  date: Date;
  isRead: boolean;
}

const EmailSchema: Schema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

export default mongoose.model<IEmail>("Email", EmailSchema);
