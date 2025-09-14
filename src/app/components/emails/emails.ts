import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf, NgFor, DatePipe } from '@angular/common';

export interface Email {
  _id?: string;
  from: string;
  subject: string;
  snippet: string;
  date: string | Date; // string from backend is fine, DatePipe can parse it
}

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DatePipe, HttpClientModule],
  templateUrl: './emails.html',
  styleUrls: ['./emails.css']
})
export class EmailsComponent implements OnInit {
  emails: Email[] = [];
  loading: boolean = true;
  error: string | null = null;

  private apiUrl = 'http://localhost:5000/api/gmail/all';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEmails();
  }

  fetchEmails() {
    this.loading = true;
    this.error = null;

    this.http.get<Email[]>(this.apiUrl).subscribe({
      next: (data) => {
        // Convert string dates to Date objects
        this.emails = data.map((email) => ({
          ...email,
          date: new Date(email.date)
        }));
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
