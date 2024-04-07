import { Routes } from '@angular/router';
import { ManagementPageComponent } from './management-page.component';
import { authGuard } from '../../shared/guards/auth.guard';
import { ManagementBrandsPageComponent } from './management-brands-page/management-brands-page.component';
import { ManagementCreateBrandPageComponent } from './management-brands-page/management-create-brand-page/management-create-brand-page.component';
import { ManagementEditBrandPageComponent } from './management-edit-brand-page/management-edit-brand-page.component';

export const managementRoutes: Routes = [
  {
    path: 'management',
    canActivate: [authGuard], // Angular Guard yapıları ilgili route'a giriş yapmadan önce çalışacak olan yapılar
    data: {
      // Route'a özel veri tutma
      requiredRoles: ['admin'],
    },
    component: ManagementPageComponent,
    // İlk karşılaştığı <router-outlet>'e ManagementPageComponent'i yerleştirir.
    children: [
      {
        path: 'brands',
        component: ManagementBrandsPageComponent,
        // İkinci karşılaştığı <router-outlet>'e ManagementBrandsPageComponent'i yerleştirir.
      },
      {
        path: 'brands/create',
        component: ManagementCreateBrandPageComponent,
      },
      {
        path: 'brands/edit/:brandId',
        // :brandId , brandId isminde bir route parametresi tanımlar
        component: ManagementEditBrandPageComponent,
      },
    ],
  },
];
