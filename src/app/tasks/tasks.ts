import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent implements OnInit {
  private readonly http = inject(HttpClient);

  newTask: string = '';
  newDeadline: string = '';
  tasks: { id: string; title: string; deadline: string; done: boolean }[] = [];

  ngOnInit() {
    this.loadTasks();
  }

  // Load tasks from backend
  loadTasks() {
    this.http.get<any[]>('http://localhost:3000/api/tasks').subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Failed to fetch tasks:', err)
    });
  }

  // Add new task to backend
  addTask() {
    if (this.newTask.trim() && this.newDeadline) {
      const newTaskObj = {
        title: this.newTask,
        deadline: this.newDeadline,
        done: false
      };

      this.http.post<any>('http://localhost:3000/api/tasks', newTaskObj).subscribe({
        next: (created) => {
          this.tasks.push(created);
          this.newTask = '';
          this.newDeadline = '';
        },
        error: (err) => console.error('Failed to add task:', err)
      });
    }
  }

  // Toggle done status (PUT request)
  toggleDone(task: any) {
    const updatedTask = { ...task, done: !task.done };

    this.http.put<any>(`http://localhost:3000/api/tasks/${task.id}`, updatedTask).subscribe({
      next: (res) => {
        task.done = res.done;
      },
      error: (err) => console.error('Failed to update task:', err)
    });
  }

  // Delete task
  deleteTask(taskId: string) {
    this.http.delete(`http://localhost:3000/api/tasks/${taskId}`).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== taskId);
      },
      error: (err) => console.error('Failed to delete task:', err)
    });
  }
}
