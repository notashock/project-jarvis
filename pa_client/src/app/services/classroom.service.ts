import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private baseUrl = 'http://localhost:5000/api/classroom';

  constructor(private http: HttpClient) {}

  /** ==================== Courses CRUD ==================== */

  // Get all user courses by googleId
  getUserCourses(googleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courses/user/${googleId}`);
  }

  // Get a single course by courseId
  getCourseById(courseId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/course/${courseId}`);
  }

  // Create a new course manually
  createCourse(googleId: string, course: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/courses`, { googleId, course });
  }

  // Update a course
  updateCourse(courseId: string, updateData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/course/${courseId}`, updateData);
  }

  // Delete a course
  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/course/${courseId}`);
  }

  // Save selected courses
  saveSelectedCourses(googleId: string, courses: any[], selectedCourseIds: string[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/courses/save/${googleId}`, { googleId, courses, selectedCourseIds });
  }

  /** ==================== Course Content ==================== */
  getActiveCourses(googleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all/${googleId}`)
  }

  // Fetch announcements for a course
  getCourseAnnouncements(courseId: string, googleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${courseId}/announcements`, { params: { googleId } });
  }

  // Fetch assignments for a course
  getCourseAssignments(courseId: string, googleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${courseId}/assignments`, { params: { googleId } });
  }

  // Fetch materials for a course
  getCourseMaterials(courseId: string, googleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${courseId}/materials`, { params: { googleId } });
  }
}
