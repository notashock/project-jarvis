// src/services/classroomService.ts
import { google } from "googleapis";
import Token from "../models/token.js";

/**
 * Get an authenticated Classroom client for a user
 */
const getClassroomClient = async (googleId: string) => {
  // Fetch stored tokens for the user
  const tokenDoc = await Token.findOne({ googleId });
  if (!tokenDoc) {
    throw new Error("No stored tokens found for this user");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: tokenDoc.accessToken,
    refresh_token: tokenDoc.refreshToken,
    expiry_date: tokenDoc.tokenExpiry,
  });

  return google.classroom({ version: "v1", auth: oauth2Client });
};

/**
 * Fetch list of courses the user is enrolled in
 */
export const fetchCourses = async (googleId: string) => {
  const classroom = await getClassroomClient(googleId);

  const res = await classroom.courses.list({
    courseStates: ["ACTIVE"], // only active courses
  });

  return res.data.courses || [];
};

/**
 * Fetch announcements for a specific course
 */
export const fetchAnnouncements = async (googleId: string, courseId: string) => {
  const classroom = await getClassroomClient(googleId);

  const res = await classroom.courses.announcements.list({
    courseId,
  });

  return res.data.announcements || [];
};

/**
 * Fetch course materials for a specific course
 */
export const fetchCourseWork = async (googleId: string, courseId: string) => {
  const classroom = await getClassroomClient(googleId);

  const res = await classroom.courses.courseWorkMaterials.list({
    courseId,
  });

  return res.data.courseWorkMaterial || [];
};
