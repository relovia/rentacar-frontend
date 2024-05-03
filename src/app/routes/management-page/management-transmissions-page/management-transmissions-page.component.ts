import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransmissionsListTableComponent } from '../../../features/transmissions/components/transmissions-list-table/transmissions-list-table.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-management-transmissions-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    RouterModule,
    TransmissionsListTableComponent,
  ],
  templateUrl: './management-transmissions-page.component.html',
  styleUrl: './management-transmissions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementTransmissionsPageComponent {}
