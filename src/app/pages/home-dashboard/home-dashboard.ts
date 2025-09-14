import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { TodoComponent } from '../../components/todo/todo';
import { EmailSummaryComponent } from '../../components/email-summary/email-summary';
import { EmailsComponent } from '../../components/emails/emails';
import { AccountsComponent } from '../../components/accounts/accounts';
import { EmailService, Email } from '../../services/email.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    TodoComponent,
    EmailSummaryComponent,
    EmailsComponent,
    AccountsComponent
  ],
  templateUrl: './home-dashboard.html',
  styleUrls: ['./home-dashboard.css']
})
export class HomeDashboardComponent implements OnInit {
  emails: Email[] = [];
  accounts: { googleId: string; email: string }[] = [];
  loading = true;
  error: string | null = null;
  selectedGoogleId: string | null = null;

  @ViewChild(EmailSummaryComponent) emailSummaryComp!: EmailSummaryComponent;

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.fetchAccounts();
    this.loadEmailsFromDb();
  }

  fetchAccounts() {
    this.emailService.getConnectedAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        this.loading = false;
        if (data.length > 0) {
          this.selectedGoogleId = data[0].googleId;
        }
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
        this.error = 'Failed to load accounts';
        this.loading = false;
      }
    });
  }

  fetchAndStoreEmails(googleId: string, count: number = 5) {
    return this.emailService.fetchAndStoreEmails(googleId, count);
  }

  loadEmailsFromDb() {
    this.loading = true;
    this.emailService.getStoredEmails().subscribe({
      next: (data) => {
        this.emails = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching stored emails:', err);
        this.error = 'Failed to load emails';
        this.loading = false;
      }
    });
  }

  refreshEmails() {
    if (!this.selectedGoogleId) return;

    this.loading = true;
    this.fetchAndStoreEmails(this.selectedGoogleId).subscribe({
      next: () => {
        this.loadEmailsFromDb();
      },
      error: (err) => {
        console.error('Error refreshing emails:', err);
        this.error = 'Failed to refresh emails';
        this.loading = false;
      }
    });
  }
}
