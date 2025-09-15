import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common'
import { ClassroomService } from '../../services/classroom.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.html',
  styleUrls: ['./class-details.css'],
  imports: [NgIf, NgFor]
})
export class ClassDetailsComponent implements OnInit {
  googleId: string | null = null;
  courses: any[] = [];
  selectedCourse: any = null;
  announcements: any[] = [];
  coursework: any[] = [];
  loading = false;

  constructor(
    private classroomService: ClassroomService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.loadGoogleAccount();
  }

  private loadGoogleAccount() {
    this.emailService.getConnectedAccounts().subscribe({
      next: (accounts) => {
        if (accounts?.length > 0) {
          this.googleId = accounts[0].googleId; // take first account for now
          this.loadCourses();
        }
      },
      error: (err) => console.error('❌ Failed to fetch accounts:', err)
    });
  }

  private loadCourses() {
    if (!this.googleId) return;
    this.loading = true;

    this.classroomService.getCourses(this.googleId).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load courses:', err);
        this.loading = false;
      }
    });
  }

  selectCourse(course: any) {
    this.selectedCourse = course;
    if (this.googleId) {
      this.loadAnnouncements(course.id);
      this.loadCoursework(course.id);
    }
  }

  private loadAnnouncements(courseId: string) {
    if (!this.googleId) return;

    this.classroomService.getAnnouncements(this.googleId, courseId).subscribe({
      next: (data) => (this.announcements = data),
      error: (err) => console.error('❌ Failed to load announcements:', err)
    });
  }

  private loadCoursework(courseId: string) {
    if (!this.googleId) return;

    this.classroomService.getCoursework(this.googleId, courseId).subscribe({
      next: (data) => (this.coursework = data),
      error: (err) => console.error('❌ Failed to load coursework:', err)
    });
  }
}
