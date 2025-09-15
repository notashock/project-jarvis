import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private API_URL = 'http://localhost:5000/api/classroom'; // adjust port if needed

  constructor(private http: HttpClient) {}

  getCourses(googleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/courses`, {
      params: { googleId }
    });
  }

  getAnnouncements(googleId: string, courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/courses/${courseId}/announcements`, {
      params: { googleId }
    });
  }

  getCoursework(googleId: string, courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/courses/${courseId}/coursework`, {
      params: { googleId }
    });
  }
}
