// src/mcp/tools/assignmentTool.ts
import { Types } from "mongoose";
import { Assignment } from "../../models/Assignment.js";
import type { IAssignment } from "../../models/Assignment.js";

/** Create a new assignment */
export const createAssignment = async (data: Partial<IAssignment>) => {
  const doc = await Assignment.create({
    ...data,
    courseworkId: new Types.ObjectId().toString(),
  });
  return doc;
};

/** Get all assignments (optional filter by courseId) */
export const getAssignments = async (courseId?: string) => {
  const query = courseId ? { courseId } : {};
  return await Assignment.find(query);
};

/** Get a single assignment */
export const getAssignmentById = async (courseworkId: string) => {
  return await Assignment.findOne({ courseworkId });
};

/** Update an assignment */
export const updateAssignment = async (courseworkId: string, data: Partial<IAssignment>) => {
  return await Assignment.findOneAndUpdate({ courseworkId }, data, { new: true });
};

/** Delete an assignment */
export const deleteAssignment = async (courseworkId: string) => {
  return await Assignment.findOneAndDelete({ courseworkId });
};
