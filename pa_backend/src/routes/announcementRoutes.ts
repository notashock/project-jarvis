// src/routes/announcementRoutes.ts
import { Router } from "express";
import * as announcementTool from "../mcp/tools/announcementTool.js";

const router = Router();

// Create Announcement
router.post("/", async (req, res) => {
  try {
    const doc = await announcementTool.createAnnouncement(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get all announcements (optional courseId)
router.get("/", async (req, res) => {
  try {
    const announcements = await announcementTool.getAnnouncements(req.query.courseId as string);
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get single announcement
router.get("/:announcementId", async (req, res) => {
  try {
    const doc = await announcementTool.getAnnouncementById(req.params.announcementId);
    if (!doc) return res.status(404).json({ message: "Announcement not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Update announcement
router.put("/:announcementId", async (req, res) => {
  try {
    const updated = await announcementTool.updateAnnouncement(req.params.announcementId, req.body);
    if (!updated) return res.status(404).json({ message: "Announcement not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Delete announcement
router.delete("/:announcementId", async (req, res) => {
  try {
    const deleted = await announcementTool.deleteAnnouncement(req.params.announcementId);
    if (!deleted) return res.status(404).json({ message: "Announcement not found" });
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
