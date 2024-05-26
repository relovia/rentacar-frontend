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
    data: {
      requiredRoles: ['admin'],
    },
    component: ManagementPageComponent,
    children: [
      // Brands
      {
        path: 'brands',
        component: ManagementBrandsPageComponent,
      },
      {
        path: 'brands/create',
        component: ManagementCreateBrandPageComponent,
      },
      {
        path: 'brands/edit/:brandId',
        component: ManagementEditBrandPageComponent,
      },

      // Models
      {
        path: 'models',
        component: ManagementModelsPageComponent,
      },
      {
        path: 'models/create',
        component: ManagementCreateModelPageComponent,
      },
      {
        path: 'models/edit/:modelId',
        component: ManagementEditModelPageComponent,
      },
      {
        path: 'models/detail/:modelId',
        component: ManagementModelDetailPageComponent,
      },
      {
        path: 'models/rent',
        component: ManagementPaymentPageComponent,
      },

      // Cars
      {
        path: 'cars',
        component: ManagementCarsPageComponent,
      },
      {
        path: 'cars/create',
        component: ManagementCreateCarPageComponent,
      },
      {
        path: 'cars/edit/:carId',
        component: ManagementEditCarPageComponent,
      },

      // Transmissions
      {
        path: 'transmissions',
        component: ManagementTransmissionsPageComponent,
      },
      {
        path: 'transmissions/create',
        component: ManagementCreateTransmissionPageComponent,
      },
      {
        path: 'transmissions/edit/:transmissionId',
        component: ManagementEditTransmissionPageComponent,
      },

      // Fuels
      {
        path: 'fuels',
        component: ManagementFuelsPageComponent,
      },
      {
        path: 'fuels/create',
        component: ManagementCreateFuelPageComponent,
      },
      {
        path: 'fuels/edit/:fuelId',
        component: ManagementEditFuelPageComponent,
      },
    ],
  },
];
