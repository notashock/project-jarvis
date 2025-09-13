// src/routes/classroomRoutes.ts
import type { Request, Response } from "express";
import { Router } from "express";
import {
  fetchCourses,
  fetchAnnouncements,
  fetchCourseWork,
} from "../services/classroomService.js";

const router = Router();

// Utility to extract googleId safely
function getGoogleId(req: Request, res: Response): string | null {
  const googleId = req.query.googleId;
  if (!googleId || typeof googleId !== "string") {
    res.status(400).json({ error: "Missing or invalid googleId" });
    return null;
  }
  return googleId;
}

/**
 * GET /api/classroom/courses
 * Fetch all active courses for the logged-in user
 */
router.get("/courses", async (req: Request, res: Response) => {
  try {
    const googleId = getGoogleId(req, res);
    if (!googleId) return;

    const courses = await fetchCourses(googleId);
    res.json(courses);
  } catch (err: any) {
    console.error("Error fetching courses:", err.message);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

/**
 * GET /api/classroom/courses/:courseId/announcements
 * Fetch announcements for a specific course
 */
router.get("/courses/:courseId/announcements", async (req: Request, res: Response) => {
  try {
    const googleId = getGoogleId(req, res);
    if (!googleId) return;

    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({ error: "Missing courseId" });
    }

    const announcements = await fetchAnnouncements(googleId, courseId);
    res.json(announcements);
  } catch (err: any) {
    console.error("Error fetching announcements:", err.message);
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

/**
 * GET /api/classroom/courses/:courseId/coursework
 * Fetch coursework/materials for a specific course
 */
router.get("/courses/:courseId/coursework", async (req: Request, res: Response) => {
  try {
    const googleId = getGoogleId(req, res);
    if (!googleId) return;

    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({ error: "Missing courseId" });
    }

    const coursework = await fetchCourseWork(googleId, courseId);
    res.json(coursework);
  } catch (err: any) {
    console.error("Error fetching coursework:", err.message);
    res.status(500).json({ error: "Failed to fetch coursework" });
  }
});

export default router;
