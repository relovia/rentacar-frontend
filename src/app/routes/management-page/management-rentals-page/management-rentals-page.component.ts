import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RentalComponent } from '../../../features/rentals/component/rental/rental.component';

@Component({
  selector: 'app-management-rentals-page',
  standalone: true,
  imports: [CommonModule, RentalComponent],
  templateUrl: './management-rentals-page.component.html',
  styleUrl: './management-rentals-page.component.scss',
})
export class ManagementRentalsPageComponent {}
