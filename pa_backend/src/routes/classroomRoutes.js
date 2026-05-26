import express from "express";
import { getUserCourses, getCourseById, updateCourse, deleteCourse, saveSelectedCourses } from "../mcp/tools/courseTool.js";
import { ClassroomService } from "../services/classroomService.js";
const router = express.Router();
/** ==================== CourseTool CRUD Routes ==================== */
// Get all courses for a user
router.get("/courses/user/:googleId", async (req, res) => {
    const googleId = req.params.googleId;
    if (!googleId)
        return res.status(400).json({ error: "googleId is required" });
    try {
        const courses = await getUserCourses(googleId);
        console.log(courses);
        res.json(courses);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get single course
router.get("/course/:courseId", async (req, res) => {
    const courseId = req.params.courseId;
    if (!courseId)
        return res.status(400).json({ error: "courseId is required" });
    try {
        const course = await getCourseById(courseId);
        if (!course)
            return res.status(404).json({ error: "Course not found" });
        res.json(course);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Update course
router.put("/courses/:courseId", async (req, res) => {
    const courseId = req.params.courseId;
    if (!courseId)
        return res.status(400).json({ error: "courseId is required" });
    try {
        const updated = await updateCourse(courseId, req.body);
        if (!updated)
            return res.status(404).json({ error: "Course not found" });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Delete course
router.delete("/courses/:courseId", async (req, res) => {
    const courseId = req.params.courseId;
    if (!courseId)
        return res.status(400).json({ error: "courseId is required" });
    try {
        const deleted = await deleteCourse(courseId);
        if (!deleted)
            return res.status(404).json({ error: "Course not found" });
        res.json({ message: "Course deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Save selected courses
router.post("/courses/save/:googleId", async (req, res) => {
    const googleId = req.params.googleId;
    const { courses, selectedCourseIds } = req.body;
    if (!googleId)
        return res.status(400).json({ error: "googleId is required" });
    if (!Array.isArray(courses) || !Array.isArray(selectedCourseIds)) {
        return res.status(400).json({ error: "courses and selectedCourseIds are required arrays" });
    }
    try {
        const saved = await saveSelectedCourses(googleId, courses, selectedCourseIds);
        res.json(saved);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/** ==================== ClassroomService Routes ==================== */
// Get all active courses from Google Classroom
router.get("/all/:googleId", async (req, res) => {
    const googleId = req.params.googleId;
    if (!googleId)
        return res.status(400).json({ error: "googleId is required" });
    try {
        const service = new ClassroomService(googleId);
        await service.init();
        const courses = await service.getAllCourses();
        console.log(courses);
        const safeCourses = courses.map(c => ({
            courseId: c.courseId ?? "",
            name: c.name ?? "",
            section: c.section ?? "",
            description: c.description ?? "",
            room: c.room ?? "",
            ownerId: c.ownerId ?? "",
            enrollmentCode: c.enrollmentCode ?? "",
            courseState: c.courseState ?? "",
        }));
        res.json(safeCourses);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Select and save courses from Google Classroom
router.post("/classroom/save/:googleId", async (req, res) => {
    const googleId = req.params.googleId;
    const { courses, selectedCourseIds } = req.body;
    if (!googleId)
        return res.status(400).json({ error: "googleId is required" });
    if (!Array.isArray(courses) || !Array.isArray(selectedCourseIds)) {
        return res.status(400).json({ error: "courses and selectedCourseIds are required arrays" });
    }
    try {
        const service = new ClassroomService(googleId);
        await service.init();
        const saved = await service.selectAndSaveCourses(courses, selectedCourseIds);
        res.json(saved);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Fetch and save announcements
router.post("/classroom/announcements/:googleId/:courseId", async (req, res) => {
    const { googleId, courseId } = req.params;
    if (!googleId || !courseId)
        return res.status(400).json({ error: "googleId and courseId are required" });
    try {
        const service = new ClassroomService(googleId);
        await service.init();
        const saved = await service.fetchAndSaveAnnouncements(courseId);
        res.json(saved);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Fetch and save assignments
router.post("/classroom/assignments/:googleId/:courseId", async (req, res) => {
    const { googleId, courseId } = req.params;
    if (!googleId || !courseId)
        return res.status(400).json({ error: "googleId and courseId are required" });
    try {
        const service = new ClassroomService(googleId);
        await service.init();
        const saved = await service.fetchAndSaveAssignments(courseId);
        res.json(saved);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Fetch and save materials
router.post("/classroom/materials/:googleId/:courseId", async (req, res) => {
    const { googleId, courseId } = req.params;
    if (!googleId || !courseId)
        return res.status(400).json({ error: "googleId and courseId are required" });
    try {
        const service = new ClassroomService(googleId);
        await service.init();
        const saved = await service.fetchAndSaveMaterials(courseId);
        res.json(saved);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;
//# sourceMappingURL=classroomRoutes.js.map