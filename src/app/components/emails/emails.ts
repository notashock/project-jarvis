import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { Email } from '../../services/email.service';

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [CommonModule, DatePipe, MarkdownModule],
  templateUrl: './emails.html',
  styleUrls: ['./emails.css']
})
export class EmailsComponent {
  @Input() emails: Email[] = [];
  @Input() loading = false;
  @Output() refresh = new EventEmitter<void>();

  refreshEmails() {
    this.refresh.emit();
  }
}
