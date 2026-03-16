import 'zone.js'; // Included with Angular CLI
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';   // your standalone root component
import { appConfig } from './app/app.config'; // global config (routing, http, etc.)

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
