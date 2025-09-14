import { Routes } from '@angular/router';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // default route
  { path: 'dashboard', component: HomeDashboardComponent },
];
