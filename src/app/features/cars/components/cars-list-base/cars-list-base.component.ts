import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  CarControllerService,
  GetAllCarResponse,
} from '../../../../shared/services/api';

@Component({
  selector: 'app-cars-list-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cars-list-base.component.html',
  styleUrl: './cars-list-base.component.scss',
})
export class CarsListBaseComponent {
  @Input() initialSelectedCarId: number | null = null; // 1. OnPush, yönteminde input değerlerinde değişiklik olduğunda değişikliği algılar.
  @Output() selectCar = new EventEmitter<GetAllCarResponse | null>();

  cars!: GetAllCarResponse[];
  selectedCar: GetAllCarResponse | null = null;
  initialSelectedCarIndex: number | null = null;

  constructor(
    protected carsService: CarControllerService,
    private change: ChangeDetectorRef
  ) {}

  // ngOnInit component ilk yerleştiğinde bir kez çalışır.
  // 2. OnPush, lifecycle hookları tetiklendiğinde değişikliği algılar.
  ngOnInit(): void {
    this.getCarsList();
  }

  getCarsList() {
    this.carsService.getAllCars().subscribe((response: GetAllCarResponse[]) => {
      this.cars = response.sort((a, b) => {
        // a.modelName ve b.modelName ile öğelerin isimlerine erişin ve karşılaştırın
        if (a.modelName && b.modelName) {
          return a.modelName.localeCompare(b.modelName); // String isimlerine göre sıralama
        }
        return 0; // İsimlerden biri yoksa veya null ise sıralama yapma
      });

      this.cars.forEach((car) => {
        if (!car.state) {
          car.state = 1;
        }
      });

      if (this.initialSelectedCarId) {
        this.selectedCar =
          this.cars.find((car) => car.id === this.initialSelectedCarId) ?? null;
        this.initialSelectedCarIndex = this.cars.findIndex(
          (car) => car.id === this.initialSelectedCarId
        );
      }

      // 3. OnPush, ChangeDetectorRef.markForCheck metodu ile componentin değişiklikleri algılaması sağlanır.
      this.change.markForCheck();
    });
  }

  // 2. OnPush, kullancı html üzerinden bir event tetiklendiğinde değişikliği algılar.
  onSelectCar(car: GetAllCarResponse) {
    this.selectedCar = this.selectedCar?.id !== car.id ? car : null;
    this.selectCar.emit(this.selectedCar);
  }
}
