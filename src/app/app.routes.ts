import { Routes } from '@angular/router';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard';
import { EmailsComponent } from './pages/emails/emails';
import { EmailDetailsComponent } from './pages/email-details/email-details';
import { ClassroomComponent } from './pages/classroom/classroom';
import { ClassDetailsComponent } from './pages/class-details/class-details';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // default route
  { path: 'dashboard', component: HomeDashboardComponent },
  { path: 'emails', component: EmailsComponent },
  { path: 'emails/:id', component: EmailDetailsComponent },
  { path: 'classroom', component: ClassroomComponent },
  { path: 'classroom/:id', component: ClassDetailsComponent },
];
