import { Routes } from '@angular/router';
import { ManagementPageComponent } from './management-page.component';
import { authGuard } from '../../shared/guards/auth.guard';
import { ManagementBrandsPageComponent } from './management-brands-page/management-brands-page.component';
import { ManagementCreateBrandPageComponent } from './management-brands-page/management-create-brand-page/management-create-brand-page.component';
<<<<<<< HEAD
import { ManagementEditBrandPageComponent } from './management-edit-brand-page/management-edit-brand-page.component';
=======
import { ManagementEditBrandPageComponent } from './management-brands-page/management-edit-brand-page/management-edit-brand-page.component';
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd

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
<<<<<<< HEAD
        path: 'brands/create',
        component: ManagementCreateBrandPageComponent,
      },
      {
        path: 'brands/edit/:brandId',
        // :brandId , brandId isminde bir route parametresi tanımlar
        component: ManagementEditBrandPageComponent,
      },
=======
        path: 'brands/create', // localhost:4200/management/brands/create
        component: ManagementCreateBrandPageComponent,
      },
      {
        path: 'brands/edit/:brandId', // localhost:4200/management/brands/edit/1 // localhost:4200/management/brands/edit/2
        // :brandId , brandId isminde bir route parametresi tanımlar
        component: ManagementEditBrandPageComponent,
      }
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
    ],
  },
];