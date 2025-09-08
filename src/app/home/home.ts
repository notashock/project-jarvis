import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TodoComponent } from '../todo/todo';
import { EmailService, Email } from '../services/email.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatePipe, TodoComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  emails: Email[] = [];
  loading = true;
  error: string | null = null;

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.emailService.getLatestEmails().subscribe({
      next: (data) => {
        this.emails = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching emails:', err);
        this.error = 'Failed to load emails';
        this.loading = false;
      }
    });
  }
}
