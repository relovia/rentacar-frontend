import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddBrandFormComponent } from '../../../../features/brands/components/add-brand-form/add-brand-form.component';

@Component({
  selector: 'app-management-create-brand-page',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, AddBrandFormComponent],
=======
  imports: [
    CommonModule,
    AddBrandFormComponent
  ],
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
  templateUrl: './management-create-brand-page.component.html',
  styleUrl: './management-create-brand-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
<<<<<<< HEAD
export class ManagementCreateBrandPageComponent {}
=======
export class ManagementCreateBrandPageComponent { }
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
