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
  private apiUrl = 'http://localhost:5000/api/gmail'; // ✅ base url only

  constructor(private http: HttpClient) {}

  // fetch latest emails from Gmail and store in DB
  fetchAndStoreEmails(googleId: string, count: number = 5) {
    return this.http.get(`${this.apiUrl}/latest/${googleId}?count=${count}`);
  }

  // fetch stored emails from DB
  getStoredEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(`${this.apiUrl}/all`);
  }

  // fetch connected Gmail accounts
  getConnectedAccounts(): Observable<{ googleId: string; email: string }[]> {
    return this.http.get<{ googleId: string; email: string }[]>(`${this.apiUrl}/accounts`);
  }
}
