import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddTransmissionFormComponent } from '../../../../features/transmissions/components/add-transmission-form/add-transmission-form.component';

@Component({
  selector: 'app-management-create-transmission-page',
  standalone: true,
  imports: [CommonModule, AddTransmissionFormComponent],
  templateUrl: './management-create-transmission-page.component.html',
  styleUrl: './management-create-transmission-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementCreateTransmissionPageComponent {}
