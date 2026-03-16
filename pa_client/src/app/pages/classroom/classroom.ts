import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassroomService } from '../../services/classroom.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classroom.html',
  styleUrls: ['./classroom.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClassroomComponent implements OnInit {
  loading = false;
  error = '';
  selectedCourses: any[] = [];
  liveCourses: any[] = [];

  googleId = '118185742213966249544'; // TODO: replace with auth service

  constructor(
    private classroomService: ClassroomService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchCourses();
  }

  async fetchCourses() {
    this.loading = true;
    this.error = '';
    try {
      const dbCourses = await firstValueFrom(this.classroomService.getUserCourses(this.googleId));

      this.ngZone.run(() => {
        if (dbCourses && dbCourses.length > 0) {
          this.selectedCourses = dbCourses;
          this.loading = false;
        } else {
          firstValueFrom(this.classroomService.getActiveCourses(this.googleId))
            .then((activeCourses: any[]) => {
              this.ngZone.run(() => {
                this.liveCourses = (activeCourses ?? []).map(c => ({ ...c, selected: false }));
                this.loading = false;
              });
            })
            .catch((err: any) => {
              this.ngZone.run(() => {
                this.error = err.error?.message || 'Failed to fetch courses';
                this.loading = false;
              });
            });
        }
      });
    } catch (err: any) {
      this.ngZone.run(() => {
        this.error = err.error?.message || 'Failed to fetch courses';
        this.loading = false;
      });
    }
  }

  async saveSelectedCourses() {
    const selectedIds = this.liveCourses.filter(c => c.selected).map(c => c.courseId);

    try {
      const saved = await firstValueFrom(
        this.classroomService.saveSelectedCourses(this.googleId, this.liveCourses, selectedIds)
      ) ?? [];

      this.ngZone.run(() => {
        this.selectedCourses = saved;
        this.liveCourses = [];
      });
    } catch (err: any) {
      this.ngZone.run(() => {
        this.error = err.error?.message || 'Failed to save courses';
      });
    }
  }

  viewCourseDetails(course: any) {
    // Navigate to class-details page with courseId as a path param
    this.router.navigate([`/class-details`, course.courseId]);
  }

  get hasSelectedLiveCourses(): boolean {
    return this.liveCourses.some(c => c.selected);
  }
}
