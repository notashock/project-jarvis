import mongoose, { Schema, Document } from "mongoose";

export interface IEmail extends Document {
  gmailMessageId: string; // unique Gmail message ID
  from: string;
  to: string;
  subject: string;
  body: string;
  date: Date;
  isRead: boolean;
  important: boolean;
}

const EmailSchema: Schema = new Schema({
  gmailMessageId: { type: String, required: true, unique: true }, // add this
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
});

// optional: create an index to optimize duplicate checks
EmailSchema.index({ gmailMessageId: 1 }, { unique: true });

export default mongoose.model<IEmail>("Email", EmailSchema);
