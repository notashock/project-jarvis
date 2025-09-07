import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TodoComponent } from '../todo/todo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatePipe, TodoComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  emails: { from: string; subject: string; date: Date; body: string }[] = [];

  ngOnInit() {
    this.emails = [
      {
        from: 'john@example.com',
        subject: 'Meeting Reminder',
        date: new Date(),
        body: 'Don’t forget our meeting at 3pm today.'
      },
      {
        from: 'jane@example.com',
        subject: 'Invoice Attached',
        date: new Date(),
        body: 'Please find the invoice attached for your records.'
      }
    ];
  }
}
