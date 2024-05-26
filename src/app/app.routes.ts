import { Routes } from '@angular/router';
import { managementRoutes } from './routes/management-page/management.routes';
import { NotFoundPageComponent } from './routes/not-found-page/not-found-page.component';
import { homeRoutes } from './routes/home-page/home.routes';
import { customerRoutes } from './routes/customers/customers.routes';
import { registerRoutes } from './routes/auths/register-page/register.routes';
import { loginRoutes } from './routes/auths/login-page/login-page/login.routes';

export const routes: Routes = [
  ...homeRoutes,
  ...managementRoutes,
  ...customerRoutes,
  ...registerRoutes,
  ...loginRoutes,
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
