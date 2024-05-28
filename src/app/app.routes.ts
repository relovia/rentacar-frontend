import { Routes } from '@angular/router';
import { managementRoutes } from './routes/management-page/management.routes';
import { NotFoundPageComponent } from './routes/not-found-page/not-found-page.component';
import { homeRoutes } from './routes/home-page/home.routes';
import { registerRoutes } from './routes/auths/register-page/register.routes';
import { loginRoutes } from './routes/auths/login-page/login.routes';
import { customerRoutes } from './routes/customers-page/customers.routes';
import { contactRoutes } from './routes/contact-page/contact.routes';
import { aboutRoutes } from './routes/about-page/about.routes';

export const routes: Routes = [
  ...homeRoutes,
  ...aboutRoutes,
  ...contactRoutes,
  ...customerRoutes,
  ...managementRoutes,
  ...registerRoutes,
  ...loginRoutes,
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
