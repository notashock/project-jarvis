// src/mcp/tools/announcementTool.ts
import { Types } from "mongoose";
import { Announcement } from "../../models/Announcement.js";
import type { IAnnouncement } from "../../models/Announcement.js";

/** Create a new announcement */
export const createAnnouncement = async (data: Partial<IAnnouncement>) => {
  const doc = await Announcement.create({
    ...data,
    announcementId: new Types.ObjectId().toString(),
  });
  return doc;
};

/** Get all announcements (optional filter by courseId) */
export const getAnnouncements = async (courseId?: string) => {
  const query = courseId ? { courseId } : {};
  return await Announcement.find(query);
};

/** Get a single announcement */
export const getAnnouncementById = async (announcementId: string) => {
  return await Announcement.findOne({ announcementId });
};

/** Update an announcement */
export const updateAnnouncement = async (announcementId: string, data: Partial<IAnnouncement>) => {
  return await Announcement.findOneAndUpdate({ announcementId }, data, { new: true });
};

/** Delete an announcement */
export const deleteAnnouncement = async (announcementId: string) => {
  return await Announcement.findOneAndDelete({ announcementId });
};
