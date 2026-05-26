// src/mcp/tools/courseTool.ts
import { Types } from "mongoose";
import { google } from "googleapis";
import { User } from "../../models/user.js";
import { Course } from "../../models/Course.js";
import { Material } from "../../models/Material.js";
import { Readable } from "stream";
/** Save user-selected courses to DB */
export const saveSelectedCourses = async (googleId, courses, selectedCourseIds) => {
    const user = await User.findOne({ googleId });
    if (!user)
        throw new Error("User not found");
    const selectedCourses = courses.filter(c => selectedCourseIds.includes(c.courseId || ""));
    const courseDocs = selectedCourses.map(c => new Course({
        ...c,
        userId: user._id,
    }));
    const savedCourses = await Course.insertMany(courseDocs);
    user.selectedCourses = savedCourses.map(c => c.courseId);
    await user.save();
    return savedCourses;
};
/** Fetch all courses for a user */
export const getUserCourses = async (googleId) => {
    const user = await User.findOne({ googleId });
    if (!user)
        throw new Error("User not found");
    const courses = await Course.find({ userId: user._id });
    return courses;
};
/** Fetch a single course by its courseId */
export const getCourseById = async (courseId) => {
    return await Course.findOne({ courseId });
};
/** Update a course */
export const updateCourse = async (courseId, data) => {
    return await Course.findOneAndUpdate({ courseId }, data, { new: true });
};
/** Delete a course */
export const deleteCourse = async (courseId) => {
    return await Course.findOneAndDelete({ courseId });
};
/**
 * Save course materials after uploading to Drive
 */
export const saveCourseMaterials = async (googleId, courseId, materials, authClient) => {
    const course = await Course.findOne({ courseId });
    if (!course)
        throw new Error("Course not found");
    const drive = google.drive({ version: "v3", auth: authClient });
    const savedMaterials = [];
    for (const mat of materials) {
        let fileId;
        if (mat.contentBuffer) {
            // Convert Buffer to stream
            const mediaStream = Readable.from(mat.contentBuffer);
            const res = await drive.files.create({
                requestBody: { name: mat.title ?? "", mimeType: mat.mimeType },
                media: { mimeType: mat.mimeType, body: mediaStream },
            });
            fileId = res.data?.id ?? undefined;
        }
        const fileUrl = fileId ? `https://drive.google.com/file/d/${fileId}/view` : "";
        const materialDoc = await Material.create({
            courseId,
            materialId: new Types.ObjectId().toString(),
            title: mat.title,
            fileUrl,
            driveFileId: fileId,
        });
        savedMaterials.push(materialDoc);
    }
    return savedMaterials;
};
//# sourceMappingURL=courseTool.js.map