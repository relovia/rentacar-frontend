import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrandsListTableComponent } from '../../../features/brands/components/brands-list-table/brands-list-table.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-management-brands-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    RouterModule,
    BrandsListTableComponent,
  ],
  templateUrl: './management-brands-page.component.html',
  styleUrl: './management-brands-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementBrandsPageComponent {}
