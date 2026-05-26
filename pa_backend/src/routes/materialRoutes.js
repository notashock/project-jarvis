// src/routes/materialRoutes.ts
import { Router } from "express";
import * as materialTool from "../mcp/tools/materialTool.js";
const router = Router();
// Create Material
router.post("/", async (req, res) => {
    try {
        const doc = await materialTool.createMaterial(req.body);
        res.status(201).json(doc);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// Get all materials (optional filter by courseId)
router.get("/", async (req, res) => {
    try {
        const materials = await materialTool.getMaterials(req.query.courseId);
        res.json(materials);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// Get single material
router.get("/:materialId", async (req, res) => {
    try {
        const doc = await materialTool.getMaterialById(req.params.materialId);
        if (!doc)
            return res.status(404).json({ message: "Material not found" });
        res.json(doc);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// Update material
router.put("/:materialId", async (req, res) => {
    try {
        const updated = await materialTool.updateMaterial(req.params.materialId, req.body);
        if (!updated)
            return res.status(404).json({ message: "Material not found" });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// Delete material
router.delete("/:materialId", async (req, res) => {
    try {
        const deleted = await materialTool.deleteMaterial(req.params.materialId);
        if (!deleted)
            return res.status(404).json({ message: "Material not found" });
        res.json({ message: "Material deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
export default router;
//# sourceMappingURL=materialRoutes.js.map