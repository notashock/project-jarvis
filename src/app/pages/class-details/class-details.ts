import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './class-details.html',
  styleUrls: ['./class-details.css']
})
export class ClassDetailsComponent {
  course: any = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.course = navigation?.extras.state?.['course'];
  }
}
