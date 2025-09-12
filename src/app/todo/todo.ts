import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Task {
  _id?: string;
  description: string;
  dueDate?: Date;
  status: 'pending' | 'done';
  source: 'manual' | 'email' | 'other';
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';
  newDueDate: string = '';
  apiUrl = 'http://localhost:5000/api/tasks'; // adjust if needed

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTasks();
  }

  // Fetch all tasks
  getTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }

  reloadTasks(){
    this.getTasks();
  }
  // Add new task
  addTask() {
    if (this.newTask.trim()) {
      const task: Partial<Task> = {
        description: this.newTask.trim(),
        status: 'pending',
        source: 'manual'
      };
      this.http.post<Task>(this.apiUrl, task).subscribe({
        next: (createdTask) => {
          this.tasks.push(createdTask);
          this.newTask = '';
        },
        error: (err) => console.error('Error creating task:', err)
      });
    }
  }

  // Mark task as done
  toggleStatus(task: Task) {
    const updated = { ...task, status: task.status === 'pending' ? 'done' : 'pending' };
    this.http.put<Task>(`${this.apiUrl}/${task._id}`, updated).subscribe({
      next: (res) => (task.status = res.status),
      error: (err) => console.error('Error updating task:', err)
    });
  }

  // Remove task
  removeTask(task: Task) {
    if (!task._id) return;
    this.http.delete(`${this.apiUrl}/${task._id}`).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t._id !== task._id);
      },
      error: (err) => console.error('Error deleting task:', err)
    });
  }
}
