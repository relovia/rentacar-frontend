import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddCarFormComponent } from '../../../../features/cars/components/add-car-form/add-car-form.component';

@Component({
  selector: 'app-management-create-car-page',
  standalone: true,
  imports: [CommonModule, AddCarFormComponent],
  templateUrl: './management-create-car-page.component.html',
  styleUrl: './management-create-car-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementCreateCarPageComponent {}
