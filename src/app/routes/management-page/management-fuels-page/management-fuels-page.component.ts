import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FuelsListTableComponent } from '../../../features/fuels/components/fuels-list-table/fuels-list-table.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-management-fuels-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    RouterModule,
    FuelsListTableComponent,
  ],
  templateUrl: './management-fuels-page.component.html',
  styleUrl: './management-fuels-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementFuelsPageComponent {}
