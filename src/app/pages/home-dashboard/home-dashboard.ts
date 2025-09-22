import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from '../../components/todo/todo';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './home-dashboard.html',
  styleUrls: ['./home-dashboard.css']
})
export class HomeDashboardComponent implements OnInit {
  @ViewChild(TodoComponent) todoComp!: TodoComponent;

  ngOnInit(): void {
    this.refreshTodo();
  }

  /** ----------------------------
   *  Todo Section Methods
   * ---------------------------- */
  addTaskToTodo() {
    if (this.todoComp) {
      this.todoComp.addTask();
    }
  }

  refreshTodo() {
    if (this.todoComp) {
      this.todoComp.reloadTasks();
    }
  }
}
