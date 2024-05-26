import { Routes } from '@angular/router';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { authGuard } from '../../shared/guards/auth.guard';

export const customerRoutes: Routes = [
  {
    path: 'customers',
    component: CustomersPageComponent,
    canActivate: [authGuard],
    data: {
      requiredRoles: ['user', 'admin'],
    },
  },
];
