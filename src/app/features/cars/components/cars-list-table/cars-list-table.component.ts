import { CarControllerService } from './../../../../shared/services/api/api/car-controller.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CarsListBaseComponent } from '../cars-list-base/cars-list-base.component';
import { TableDirective } from '../../../../shared/directives/table.directive';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { ConfirmationPopUpComponent } from '../../../../shared/components/confirmation-pop-up/confirmation-pop-up.component';

@Component({
  selector: 'app-cars-list-table',
  standalone: true,
  imports: [
    CommonModule,
    TableDirective,
    ButtonComponent,
    RouterModule,
    ConfirmationPopUpComponent,
  ],
  templateUrl: './cars-list-table.component.html',
  styleUrl: './cars-list-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarsListTableComponent extends CarsListBaseComponent {
  showDeleteConfirmation: boolean = false;
  deletingCarId: number | null = null;

  constructor(carsService: CarControllerService, change: ChangeDetectorRef) {
    // Alt sınıfta bir constructor tanımlandığında super() ile üst sınıfın constructor'ı da çağrılmalıdır.
    super(carsService, change); // super ana sınıfın constructor'ını çağırır.
  }

  deleteCar(id: number) {
    this.deletingCarId = id;
    this.showDeleteConfirmation = true;
  }

  onDeleteConfirm() {
    if (this.deletingCarId !== null) {
      this.carsService.deleteCar({ id: this.deletingCarId }).subscribe({
        complete: () => {
          this.getCarsList();
        },
      });
    }
    this.resetDeleteConfirmation();
  }

  onDeleteCancel() {
    this.resetDeleteConfirmation();
  }

  private resetDeleteConfirmation() {
    this.deletingCarId = null;
    this.showDeleteConfirmation = false;
  }
}
