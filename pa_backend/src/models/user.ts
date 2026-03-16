import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiry?: number;        // <-- added
  selectedCourses: string[];
}

const userSchema = new Schema<IUser>(
  {
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    tokenExpiry: { type: Number },  // <-- added
    selectedCourses: [{ type: String }],
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
