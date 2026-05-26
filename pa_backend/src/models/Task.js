import mongoose, { Schema, Document, Types } from "mongoose";
const taskSchema = new Schema({
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
}, { timestamps: true });
export default mongoose.model("Task", taskSchema);
//# sourceMappingURL=Task.js.map