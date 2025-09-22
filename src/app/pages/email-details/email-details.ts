import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

export interface Email {
  _id?: string;
  from: string;
  subject: string;
  body: string;
  date: string | Date;
}

@Component({
  selector: 'app-email-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-details.html',
  styleUrls: ['./email-details.css']
})
export class EmailDetailsComponent {
  email?: Email;

  constructor(private router: Router, private route: ActivatedRoute) {
    // Get email from navigation state
    const navigation = this.router.getCurrentNavigation();
    this.email = navigation?.extras.state?.['email'];
  }
}
