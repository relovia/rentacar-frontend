import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  CarControllerService,
  GetAllCarResponse,
} from '../../../../shared/services/api';
import { TableDirective } from '../../../../shared/directives/table.directive';
import { HomeLayoutComponent } from '../../../../shared/layouts/home-layout/home-layout.component';
import { RouterModule } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, TableDirective, RouterModule, HomeLayoutComponent],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss',
})
export class CarListComponent implements OnInit {
  cars: GetAllCarResponse[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe((cars: GetAllCarResponse[]) => {
      console.log(cars);
      this.cars = cars;
    });
  }
}
