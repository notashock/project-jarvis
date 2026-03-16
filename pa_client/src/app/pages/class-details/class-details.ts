import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../../services/classroom.service';

export interface Course {
  _id?: string;
  name: string;
  section?: string;
  courseId: string;
  description?: string;
  teacher?: string;
}

export interface Announcement {
  title: string;
  message: string;
  date: string | Date;
}

export interface Assignment {
  title: string;
  dueDate: string | Date;
  description?: string;
}

export interface Material {
  title: string;
  url: string;
  type?: string;
}

@Component({
  selector: 'app-class-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterModule, DatePipe],
  templateUrl: './class-details.html',
  styleUrls: ['./class-details.css']
})
export class ClassDetailsComponent implements OnInit {
  course: Course | null = null;
  loadingCourse: boolean = true;
  errorCourse: string | null = null;

  announcements: Announcement[] = [];
  loadingAnnouncements: boolean = true;
  errorAnnouncements: string | null = null;

  assignments: Assignment[] = [];
  loadingAssignments: boolean = true;
  errorAssignments: string | null = null;

  materials: Material[] = [];
  loadingMaterials: boolean = true;
  errorMaterials: string | null = null;

  googleId: string = '118185742213966249544'; // replace or fetch dynamically

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private classroomService: ClassroomService
  ) {}

  ngOnInit(): void {
    this.fetchCourse();
  }

  /** ==================== COURSE ==================== */
  fetchCourse(): void {
    this.loadingCourse = true;
    this.errorCourse = null;
    this.course = null;

    const courseId = this.route.snapshot.paramMap.get('courseId');
    if (!courseId) {
      this.errorCourse = 'Invalid course ID';
      this.loadingCourse = false;
      return;
    }

    this.classroomService.getCourseById(courseId).subscribe({
      next: (data) => {
        if (!data) {
          this.errorCourse = 'Course not found';
        } else {
          this.course = data;
          // After fetching course, load related content
          this.fetchAnnouncements(courseId);
          this.fetchAssignments(courseId);
          this.fetchMaterials(courseId);
        }
        this.loadingCourse = false;
      },
      error: (err) => {
        console.error('Error fetching course:', err);
        this.errorCourse = err.error?.message || 'Failed to load course details';
        this.loadingCourse = false;
      }
    });
  }

  /** ==================== ANNOUNCEMENTS ==================== */
  fetchAnnouncements(courseId: string): void {
    this.loadingAnnouncements = true;
    this.errorAnnouncements = null;
    this.announcements = [];

    this.classroomService.getCourseAnnouncements(courseId, this.googleId).subscribe({
      next: (data) => {
        this.announcements = data.map(a => ({ ...a, date: new Date(a.date) }));
        this.loadingAnnouncements = false;
      },
      error: (err) => {
        console.error('Error fetching announcements:', err);
        this.errorAnnouncements = 'Failed to load announcements';
        this.loadingAnnouncements = false;
      }
    });
  }

  /** ==================== ASSIGNMENTS ==================== */
  fetchAssignments(courseId: string): void {
    this.loadingAssignments = true;
    this.errorAssignments = null;
    this.assignments = [];

    this.classroomService.getCourseAssignments(courseId, this.googleId).subscribe({
      next: (data) => {
        this.assignments = data.map(a => ({ ...a, dueDate: new Date(a.dueDate) }));
        this.loadingAssignments = false;
      },
      error: (err) => {
        console.error('Error fetching assignments:', err);
        this.errorAssignments = 'Failed to load assignments';
        this.loadingAssignments = false;
      }
    });
  }

  /** ==================== MATERIALS ==================== */
  fetchMaterials(courseId: string): void {
    this.loadingMaterials = true;
    this.errorMaterials = null;
    this.materials = [];

    this.classroomService.getCourseMaterials(courseId, this.googleId).subscribe({
      next: (data) => {
        this.materials = data;
        this.loadingMaterials = false;
      },
      error: (err) => {
        console.error('Error fetching materials:', err);
        this.errorMaterials = 'Failed to load materials';
        this.loadingMaterials = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/classroom']);
  }
}
