import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarsListTableComponent } from '../../../features/cars/components/cars-list-table/cars-list-table.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-management-cars-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    RouterModule,
    CarsListTableComponent,
  ],
  templateUrl: './management-cars-page.component.html',
  styleUrl: './management-cars-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementCarsPageComponent {}
