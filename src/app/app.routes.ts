import { Routes } from '@angular/router';
import { managementRoutes } from './routes/management-page/management.routes';
import { NotFoundPageComponent } from './routes/not-found-page/not-found-page.component';
import { homeRoutes } from './routes/home-page/home.routes';
import { customerRoutes } from './routes/customers/customers.routes';

export const routes: Routes = [
  ...homeRoutes,
  ...managementRoutes, // [1, 2, 3] // Desturcturing Operator
  ...customerRoutes,
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
