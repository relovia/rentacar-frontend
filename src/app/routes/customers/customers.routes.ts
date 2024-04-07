import { Routes } from '@angular/router';
import { CustomersPageComponent } from './customers-page/customers-page.component';

export const customerRoutes: Routes = [
  {
    path: 'customers',
    component: CustomersPageComponent,
    // İlk karşılaştığı <router-outlet>'e HomePageComponent'i yerleştirir.
  },
];
