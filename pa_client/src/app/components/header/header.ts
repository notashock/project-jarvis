import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AccountsComponent } from '../accounts/accounts'; // adjust path if needed

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, AccountsComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  showDropdown = false;

  constructor(public router: Router) {}

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    this.showDropdown = false;
  }
}
