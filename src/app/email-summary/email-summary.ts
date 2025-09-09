import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-summary.html',
  styleUrl: './email-summary.css'
})
export class EmailSummaryComponent {
  summary: string | null = null;
  loading = false;
  error: string | null = null;

  private apiUrl = 'http://localhost:5000/api/gemini/summarize';

  constructor(private http: HttpClient) {}

  fetchSummary(): void {
    this.loading = true;
    this.http.post<{ summary: string }>(this.apiUrl, {}).subscribe({
      next: (res) => {
        this.summary = res.summary;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching summary:', err);
        this.error = 'Failed to load summary';
        this.loading = false;
      }
    });
  }
}
