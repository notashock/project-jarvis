// src/models/Announcement.ts
import { Schema, model, Document } from "mongoose";

export interface IAnnouncement extends Document {
  courseId: string;          // Changed to string
  announcementId: string;    // Google Classroom announcement ID
  text: string;              // Announcement content
  materials?: {
    title?: string;
    fileUrl?: string;
    driveFileId?: string;
  }[];
  links?: string[];
  fileUrl?: string;          // Quick access to primary file
  scheduledTime?: Date;      // When announcement should go live
}

const announcementSchema = new Schema<IAnnouncement>(
  {
    courseId: { type: String, required: true },  // Changed here
    announcementId: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    materials: [
      {
        title: String,
        fileUrl: String,
        driveFileId: String,
      },
    ],
    links: [String],
    fileUrl: String,
    scheduledTime: Date,
  },
  { timestamps: true }
);

export const Announcement = model<IAnnouncement>("Announcement", announcementSchema);
