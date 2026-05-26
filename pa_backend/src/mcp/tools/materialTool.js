// src/mcp/tools/materialTool.ts
import { Types } from "mongoose";
import { Material } from "../../models/Material.js";
/** Create a new material */
export const createMaterial = async (data) => {
    const doc = await Material.create({
        ...data,
        materialId: new Types.ObjectId().toString(),
    });
    return doc;
};
/** Get all materials (optional filter by courseId) */
export const getMaterials = async (courseId) => {
    const query = courseId ? { courseId } : {};
    return await Material.find(query);
};
/** Get a single material by materialId */
export const getMaterialById = async (materialId) => {
    return await Material.findOne({ materialId });
};
/** Update a material */
export const updateMaterial = async (materialId, data) => {
    return await Material.findOneAndUpdate({ materialId }, data, { new: true });
};
/** Delete a material */
export const deleteMaterial = async (materialId) => {
    return await Material.findOneAndDelete({ materialId });
};
//# sourceMappingURL=materialTool.js.map