// src/routes/assignmentRoutes.ts
import { Router } from "express";
import * as assignmentTool from "../mcp/tools/assignmentTool.js";
const router = Router();
// Create Assignment
router.post("/", async (req, res) => {
    try {
        const doc = await assignmentTool.createAssignment(req.body);
        res.status(201).json(doc);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// Get all assignments (optional courseId)
router.get("/", async (req, res) => {
    try {
        const assignments = await assignmentTool.getAssignments(req.query.courseId);
        res.json(assignments);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// Get single assignment
router.get("/:courseworkId", async (req, res) => {
    try {
        const doc = await assignmentTool.getAssignmentById(req.params.courseworkId);
        if (!doc)
            return res.status(404).json({ message: "Assignment not found" });
        res.json(doc);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// Update assignment
router.put("/:courseworkId", async (req, res) => {
    try {
        const updated = await assignmentTool.updateAssignment(req.params.courseworkId, req.body);
        if (!updated)
            return res.status(404).json({ message: "Assignment not found" });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// Delete assignment
router.delete("/:courseworkId", async (req, res) => {
    try {
        const deleted = await assignmentTool.deleteAssignment(req.params.courseworkId);
        if (!deleted)
            return res.status(404).json({ message: "Assignment not found" });
        res.json({ message: "Assignment deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
export default router;
//# sourceMappingURL=assignmentRoutes.js.map