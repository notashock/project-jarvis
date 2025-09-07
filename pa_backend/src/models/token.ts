// src/models/token.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IToken extends Document {
  googleId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiry: number;
}

const tokenSchema: Schema = new Schema(
  {
    googleId: { type: String, required: true },
    email: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String },
    tokenExpiry: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<IToken>("Token", tokenSchema);
