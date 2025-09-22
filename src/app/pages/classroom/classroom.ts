import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ClassroomService } from '../../services/classroom.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './classroom.html',
  styleUrls: ['./classroom.css']
})
export class ClassroomComponent implements OnInit {
  googleId: string | null = null;
  courses: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private classroomService: ClassroomService,
    private emailService: EmailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGoogleAccount();
  }

  private loadGoogleAccount() {
    this.emailService.getConnectedAccounts().subscribe({
      next: (accounts) => {
        if (accounts?.length > 0) {
          this.googleId = accounts[0].googleId;
          this.loadCourses();
        } else {
          this.loading = false;
          this.error = 'No connected accounts found';
        }
      },
      error: (err) => {
        console.error('Failed to fetch accounts:', err);
        this.error = 'Failed to fetch accounts';
        this.loading = false;
      }
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
        console.error('Failed to load courses:', err);
        this.error = 'Failed to load courses';
        this.loading = false;
      }
    });
  }

  viewCourseDetails(course: any) {
    this.router.navigate(['/classroom', course.id], { state: { course } });
  }
}
