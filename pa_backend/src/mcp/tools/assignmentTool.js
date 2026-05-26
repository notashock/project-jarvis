// src/mcp/tools/assignmentTool.ts
import { Types } from "mongoose";
import { Assignment } from "../../models/Assignment.js";
/** Create a new assignment */
export const createAssignment = async (data) => {
    const doc = await Assignment.create({
        ...data,
        courseworkId: new Types.ObjectId().toString(),
    });
    return doc;
};
/** Get all assignments (optional filter by courseId) */
export const getAssignments = async (courseId) => {
    const query = courseId ? { courseId } : {};
    return await Assignment.find(query);
};
/** Get a single assignment */
export const getAssignmentById = async (courseworkId) => {
    return await Assignment.findOne({ courseworkId });
};
/** Update an assignment */
export const updateAssignment = async (courseworkId, data) => {
    return await Assignment.findOneAndUpdate({ courseworkId }, data, { new: true });
};
/** Delete an assignment */
export const deleteAssignment = async (courseworkId) => {
    return await Assignment.findOneAndDelete({ courseworkId });
};
//# sourceMappingURL=assignmentTool.js.map