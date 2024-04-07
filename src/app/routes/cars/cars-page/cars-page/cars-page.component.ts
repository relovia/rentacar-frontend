import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarListComponent } from '../../../../features/cars/components/car-list/car-list.component';
import { HomeLayoutComponent } from '../../../../shared/layouts/home-layout/home-layout.component';

@Component({
  selector: 'app-cars-page',
  standalone: true,
  imports: [CommonModule, CarListComponent, CarListComponent],
  templateUrl: './cars-page.component.html',
  styleUrl: './cars-page.component.scss',
})
export class CarsPageComponent {}
