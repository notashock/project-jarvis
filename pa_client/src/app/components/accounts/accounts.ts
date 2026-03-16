import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.html',
  styleUrls: ['./accounts.css']
})
export class AccountsComponent implements OnInit {
  accounts: { googleId: string; email: string }[] = [];
  loading = false;
  message = '';
  private backendCallbackUrl = 'http://localhost:5000/api/auth/google/callback';

  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.handleCallback(code);
    } else {
      this.fetchAccounts();
    }
  }

  handleCallback(code: string) {
    this.loading = true;
    this.message = 'Connecting your account...';

    this.http.get(`${this.backendCallbackUrl}?code=${code}`).subscribe({
      next: (res: any) => {
        this.message = `Connected account: ${res.user?.email || 'Unknown'}`;
        this.fetchAccounts(); // fetch updated accounts
      },
      error: (err) => {
        console.error('Callback error:', err);
        this.message = 'Failed to connect account.';
        this.loading = false;
      }
    });
  }

  fetchAccounts() {
    this.loading = true;
    this.emailService.getConnectedAccounts().subscribe({
      next: (res) => {
        this.accounts = res;
        this.loading = false;
        this.message = '';
      },
      error: (err) => {
        console.error('Failed to fetch accounts:', err);
        this.message = 'Unable to load connected accounts';
        this.loading = false;
      }
    });
  }

  connectNewAccount() {
    window.location.href = 'http://localhost:5000/api/auth/google';
  }
}
