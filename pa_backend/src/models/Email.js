import mongoose, { Schema, Document } from "mongoose";
const EmailSchema = new Schema({
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
export default mongoose.model("Email", EmailSchema);
//# sourceMappingURL=Email.js.map