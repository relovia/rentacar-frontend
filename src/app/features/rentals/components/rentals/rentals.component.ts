import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../../../../shared/layouts/home-layout/home-layout.component';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeLayoutComponent],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.scss',
})
export class RentalsComponent {}
