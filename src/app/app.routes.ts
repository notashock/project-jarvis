import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent }
];
