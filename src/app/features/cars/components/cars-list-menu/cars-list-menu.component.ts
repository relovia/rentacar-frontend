import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  MenuComponent,
  MenuItem,
} from '../../../../shared/components/menu/menu.component';
import { CarsListBaseComponent } from '../cars-list-base/cars-list-base.component';

@Component({
  selector: 'app-cars-list-menu',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './cars-list-menu.component.html',
  styleUrl: './cars-list-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush ile değişikliklerin kontrolü optimize edilir.
})
export class CarsListMenuComponent
  extends CarsListBaseComponent
  implements OnInit
{
  get carsMenuItems(): MenuItem[] {
    return (
      this.cars?.map((car) => {
        return {
          label: car.modelName!,
          click: (_: MouseEvent) => this.onSelectCar(car),
        };
      }) ?? []
    );
  }
}
