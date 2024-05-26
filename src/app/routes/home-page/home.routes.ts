import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';

export const homeRoutes: Routes = [
  {
    path: '', // localhost:4200
    pathMatch: 'full',
    component: HomePageComponent,
  },
];
