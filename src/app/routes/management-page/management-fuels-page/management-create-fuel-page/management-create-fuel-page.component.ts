import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddFuelFormComponent } from '../../../../features/fuels/components/add-fuel-form/add-fuel-form.component';

@Component({
  selector: 'app-management-create-fuel-page',
  standalone: true,
  imports: [CommonModule, AddFuelFormComponent],
  templateUrl: './management-create-fuel-page.component.html',
  styleUrl: './management-create-fuel-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementCreateFuelPageComponent {}
