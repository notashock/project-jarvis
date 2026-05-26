// src/services/classroomService.ts
import { google, classroom_v1 } from "googleapis";
import { getAuthorizedClient } from "../mcp/tools/authTool.js";
import { Types } from "mongoose";
import { Course } from "../models/Course.js";
import { Assignment } from "../models/Assignment.js";
import { Announcement } from "../models/Announcement.js";
import { Material } from "../models/Material.js";
export class ClassroomService {
    constructor(googleId) {
        this.googleId = googleId;
    }
    /** Initialize Classroom and Drive clients */
    async init() {
        try {
            this.authClient = await getAuthorizedClient(this.googleId);
            this.classroom = google.classroom({ version: "v1", auth: this.authClient });
            this.drive = google.drive({ version: "v3", auth: this.authClient });
        }
        catch (err) {
            console.error("Failed to initialize ClassroomService:", JSON.stringify(err));
            throw new Error("ClassroomService init failed");
        }
    }
    /** Fetch all active courses */
    async getAllCourses() {
        try {
            const res = await this.classroom.courses.list({ courseStates: ["ACTIVE"] });
            const courses = res.data.courses || [];
            return courses.map(course => ({
                courseId: course.id ?? "",
                name: course.name ?? "",
                section: course.section ?? "",
                description: course.descriptionHeading ?? "",
                room: course.room ?? "",
                ownerId: course.ownerId ?? "",
                enrollmentCode: course.enrollmentCode ?? "",
                courseState: course.courseState ?? "",
            }));
        }
        catch (err) {
            console.error("Error fetching courses:", JSON.stringify(err));
            return [];
        }
    }
    /** Save selected courses and register Pub/Sub feeds */
    async selectAndSaveCourses(courses, selectedCourseIds) {
        try {
            const userCourses = courses.filter(c => selectedCourseIds.includes(c.courseId ?? ""));
            const savedCourses = await Course.insertMany(userCourses.map(c => ({ ...c, materials: [] })));
            if (!process.env.PUBSUB_TOPIC) {
                console.warn("PUBSUB_TOPIC not defined, skipping feed registration");
            }
            else {
                for (const courseId of selectedCourseIds) {
                    try {
                        await this.classroom.registrations.create({
                            requestBody: {
                                feed: { feedType: "COURSE_WORK_CHANGES", courseWorkChangesInfo: { courseId } },
                                cloudPubsubTopic: { topicName: process.env.PUBSUB_TOPIC },
                            },
                        });
                        await this.classroom.registrations.create({
                            requestBody: {
                                feed: { feedType: "ANNOUNCEMENTS", courseId },
                                cloudPubsubTopic: { topicName: process.env.PUBSUB_TOPIC },
                            },
                        });
                    }
                    catch (err) {
                        const message = err?.message || JSON.stringify(err);
                        if (!message.includes("already exists"))
                            console.error("Feed registration error:", err);
                    }
                }
            }
            return savedCourses;
        }
        catch (err) {
            console.error("Error saving selected courses:", JSON.stringify(err));
            return [];
        }
    }
    /** Fetch and save announcements */
    async fetchAndSaveAnnouncements(courseId) {
        const saved = [];
        try {
            const res = await this.classroom.courses.announcements.list({ courseId });
            console.log(res);
            const announcements = res.data.announcements || [];
            for (const ann of announcements) {
                try {
                    const doc = await Announcement.create({
                        courseId,
                        announcementId: ann.id ?? new Types.ObjectId().toString(),
                        text: ann.text ?? undefined,
                        links: ann.alternateLink ? [ann.alternateLink] : [],
                        materials: [],
                        state: ann.state ?? "PUBLISHED",
                        scheduledTime: ann.scheduledTime ? new Date(ann.scheduledTime) : undefined,
                    });
                    saved.push(doc);
                }
                catch (innerErr) {
                    console.error("Error saving announcement:", JSON.stringify(innerErr));
                }
            }
        }
        catch (err) {
            console.error("Error fetching announcements:", JSON.stringify(err));
        }
        return saved;
    }
    /** Fetch and save assignments */
    async fetchAndSaveAssignments(courseId) {
        const saved = [];
        try {
            const res = await this.classroom.courses.courseWork.list({ courseId });
            const courseWorks = res.data.courseWork || [];
            for (const cw of courseWorks) {
                try {
                    if (!cw.title || (cw.workType !== "ASSIGNMENT" && cw.workType !== "QUIZ_ASSIGNMENT"))
                        continue;
                    const doc = await Assignment.create({
                        courseId,
                        courseworkId: cw.id ?? new Types.ObjectId().toString(),
                        title: cw.title,
                        instructions: cw.description ?? undefined,
                        topic: cw.topicId ?? undefined,
                        maxPoints: cw.maxPoints ?? undefined,
                        dueDate: cw.dueDate
                            ? new Date(cw.dueDate.year ?? 0, (cw.dueDate.month ?? 1) - 1, cw.dueDate.day ?? 1)
                            : undefined,
                        materials: [],
                        links: cw.alternateLink ? [cw.alternateLink] : [],
                        state: cw.state ?? "PUBLISHED",
                    });
                    saved.push(doc);
                }
                catch (innerErr) {
                    console.error("Error saving assignment:", JSON.stringify(innerErr));
                }
            }
        }
        catch (err) {
            console.error("Error fetching assignments:", JSON.stringify(err));
        }
        return saved;
    }
    /** Fetch and save materials */
    async fetchAndSaveMaterials(courseId) {
        const savedMaterials = [];
        try {
            const res = await this.classroom.courses.courseWorkMaterials.list({ courseId });
            const materials = res.data.courseWorkMaterial || [];
            for (const m of materials) {
                if (!m.materials || m.materials.length === 0)
                    continue;
                for (const mat of m.materials) {
                    const driveFile = mat.driveFile?.driveFile;
                    if (!driveFile?.id || !driveFile?.title)
                        continue;
                    try {
                        const copiedFile = await this.drive.files.copy({
                            fileId: driveFile.id,
                            requestBody: { name: driveFile.title },
                        });
                        const fileUrl = copiedFile.data?.id
                            ? `https://drive.google.com/file/d/${copiedFile.data.id}/view`
                            : "";
                        const doc = await Material.create({
                            courseId,
                            materialId: new Types.ObjectId().toString(),
                            title: driveFile.title,
                            fileUrl,
                            driveFileId: copiedFile.data?.id ?? undefined,
                        });
                        savedMaterials.push(doc);
                    }
                    catch (innerErr) {
                        console.error(`Failed to copy material ${driveFile.title}:`, JSON.stringify(innerErr));
                    }
                }
            }
        }
        catch (err) {
            console.error("Error fetching materials:", JSON.stringify(err));
        }
        return savedMaterials;
    }
}
//# sourceMappingURL=classroomService.js.map