import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Email {
  from: string;
  subject: string;
  date: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:5000/api/gmail'; // adjust if different

  constructor(private http: HttpClient) {}

  getLatestEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(`${this.apiUrl}/all`);
  }
}
