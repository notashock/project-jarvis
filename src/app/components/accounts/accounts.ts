import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.html',
  styleUrls: ['./accounts.css']
})
export class AccountsComponent {
  @Input() accounts: { googleId: string; email: string }[] = [];
}
