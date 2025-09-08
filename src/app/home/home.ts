import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TodoComponent } from '../todo/todo';
import { EmailSummaryComponent } from '../email-summary/email-summary';
import { EmailService, Email } from '../services/email.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatePipe, TodoComponent, EmailSummaryComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  emails: Email[] = [];
  accounts: { googleId: string; email: string }[] = [];

  loading = true;
  error: string | null = null;

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.fetchEmails();
    this.fetchAccounts();
  }

  fetchEmails() {
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

  fetchAccounts() {
    this.emailService.getConnectedAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
      }
    });
  }
}
