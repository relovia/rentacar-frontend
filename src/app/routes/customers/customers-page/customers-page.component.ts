import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerListComponent } from '../../../features/customer-list/components/customer-list/customer-list.component';

@Component({
  selector: 'app-customers-page',
  standalone: true,
  imports: [CommonModule, CustomerListComponent],
  templateUrl: './customers-page.component.html',
  styleUrl: './customers-page.component.scss',
})
export class CustomersPageComponent {}
