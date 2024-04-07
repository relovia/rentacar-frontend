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
<<<<<<< HEAD
    RouterModule,
    BrandsListTableComponent,
=======
    BrandsListTableComponent,
    RouterModule,
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
  ],
  templateUrl: './management-brands-page.component.html',
  styleUrl: './management-brands-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementBrandsPageComponent {}
