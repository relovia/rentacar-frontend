import { Routes } from '@angular/router';
import { ManagementPageComponent } from './management-page.component';
import { authGuard } from '../../shared/guards/auth.guard';
import { ManagementBrandsPageComponent } from './management-brands-page/management-brands-page.component';
import { ManagementCreateBrandPageComponent } from './management-brands-page/management-create-brand-page/management-create-brand-page.component';
import { ManagementModelsPageComponent } from './management-models-page/management-models-page.component';
import { ManagementCreateModelPageComponent } from './management-models-page/management-create-model-page/management-create-model-page.component';
import { ManagementEditModelPageComponent } from './management-models-page/management-edit-model-page/management-edit-model-page.component';
import { ManagementEditBrandPageComponent } from './management-brands-page/management-edit-brand-page/management-edit-brand-page.component';
import { ManagementCarsPageComponent } from './management-cars-page/management-cars-page.component';
import { ManagementCreateCarPageComponent } from './management-cars-page/management-create-car-page/management-create-car-page.component';
import { ManagementEditCarPageComponent } from './management-cars-page/management-edit-car-page/management-edit-car-page.component';
import { ManagementTransmissionsPageComponent } from './management-transmissions-page/management-transmissions-page.component';
import { ManagementCreateTransmissionPageComponent } from './management-transmissions-page/management-create-transmission-page/management-create-transmission-page.component';
import { ManagementEditTransmissionPageComponent } from './management-transmissions-page/management-edit-transmission-page/management-edit-transmission-page.component';
import { ManagementModelDetailPageComponent } from './management-models-page/management-model-detail-page/management-model-detail-page.component';
import { ManagementPaymentPageComponent } from './management-payment-page/management-payment-page.component';
import { ManagementFuelsPageComponent } from './management-fuels-page/management-fuels-page.component';
import { ManagementCreateFuelPageComponent } from './management-fuels-page/management-create-fuel-page/management-create-fuel-page.component';
import { ManagementEditFuelPageComponent } from './management-fuels-page/management-edit-fuel-page/management-edit-fuel-page.component';

export const managementRoutes: Routes = [
  {
    path: 'management',
    canActivate: [authGuard], // Angular Guard yapıları ilgili route'a giriş yapmadan önce çalışacak olan yapılar
    component: ManagementPageComponent,
    children: [
      // Brands
      {
        path: 'brands',
        component: ManagementBrandsPageComponent,
        data: {
          requiredRoles: ['USER'],
        },
      },
      {
        path: 'brands/create',
        component: ManagementCreateBrandPageComponent,
        data: {
          requiredRoles: ['ADMIN'],
        },
      },
      {
        path: 'brands/edit/:brandId',
        component: ManagementEditBrandPageComponent,
        data: {
          requiredRoles: ['ADMIN'],
        },
      },

      // Models
      {
        path: 'models',
        component: ManagementModelsPageComponent,
        data: {
          requiredRoles: ['USER'],
        },
      },
      {
        path: 'models/create',
        component: ManagementCreateModelPageComponent,
        data: {
          requiredRoles: ['ADMIN'],
        },
      },
      {
        path: 'models/edit/:modelId',
        component: ManagementEditModelPageComponent,
        data: {
          requiredRoles: ['ADMIN'],
        },
      },
      // Model Detail
      {
        path: 'models/detail/:modelId',
        component: ManagementModelDetailPageComponent,
      },
      // Model Rent
      {
        path: 'models/rent',
        component: ManagementPaymentPageComponent,
      },

      // Cars
      {
        path: 'cars',
        component: ManagementCarsPageComponent,
        data: {
          requiredRoles: ['USER'],
        },
      },
      {
        path: 'cars/create',
        component: ManagementCreateCarPageComponent,
        data: {
          requiredRoles: ['ADMIN'],
        },
      },
      {
        path: 'cars/edit/:carId',
        component: ManagementEditCarPageComponent,
        data: {
          requiredRoles: ['ADMIN'],
        },
      },

      // Transmissions
      {
        path: 'transmissions',
        component: ManagementTransmissionsPageComponent,
        data: {
          requiredRoles: ['USER'],
        },
      },
      {
        path: 'transmissions/create',
        component: ManagementCreateTransmissionPageComponent,
        data: {
          requiredRoles: ['ADMIN'],
        },
      },
      {
        path: 'transmissions/edit/:transmissionId',
        component: ManagementEditTransmissionPageComponent,
        data: {
          requiredRoles: ['ADMIN'],
        },
      },

      // Fuels
      {
        path: 'fuels',
        component: ManagementFuelsPageComponent,
        data: {
          requiredRoles: ['USER'],
        },
      },
      {
        path: 'fuels/create',
        component: ManagementCreateFuelPageComponent,
        data: {
          requiredRoles: ['ADMIN'],
        },
      },
      {
        path: 'fuels/edit/:fuelId',
        component: ManagementEditFuelPageComponent,
        data: {
          requiredRoles: ['ADMIN'],
        },
      },
    ],
  },
];
