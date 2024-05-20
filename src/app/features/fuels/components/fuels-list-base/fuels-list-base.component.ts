import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  GetAllFuelResponse,
  FuelControllerService,
} from '../../../../shared/services/api';

@Component({
  selector: 'app-fuels-list-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fuels-list-base.component.html',
  styleUrl: './fuels-list-base.component.scss',
})
export class FuelsListBaseComponent {
  @Input() initialSelectedFuelId: number | null = null; // 1. OnPush, yönteminde input değerlerinde değişiklik olduğunda değişikliği algılar.
  @Output() selectFuel = new EventEmitter<GetAllFuelResponse | null>();

  fuels!: GetAllFuelResponse[];
  selectedFuel: GetAllFuelResponse | null = null;
  initialSelectedFuelIndex: number | null = null;

  constructor(
    protected fuelsService: FuelControllerService,
    protected change: ChangeDetectorRef
  ) {}

  // ngOnInit component ilk yerleştiğinde bir kez çalışır.
  // 2. OnPush, lifecycle hookları tetiklendiğinde değişikliği algılar.
  ngOnInit(): void {
    this.getFuelsList();
  }

  getFuelsList() {
    this.fuelsService.getAllFuels().subscribe((response) => {
      this.fuels = response.sort((a, b) => {
        // a.name ve b.name ile öğelerin isimlerine erişin ve karşılaştırın
        if (a.name && b.name) {
          return a.name.localeCompare(b.name); // String isimlerine göre sıralama
        }
        return 0; // İsimlerden biri yoksa veya null ise sıralama yapma
      });

      if (this.initialSelectedFuelId) {
        this.selectedFuel =
          this.fuels.find((fuel) => fuel.id === this.initialSelectedFuelId) ??
          null;
        this.initialSelectedFuelIndex = this.fuels.findIndex(
          (fuel) => fuel.id === this.initialSelectedFuelId
        );
      }

      // 3. OnPush, ChangeDetectorRef.markForCheck metodu ile componentin değişiklikleri algılaması sağlanır.
      this.change.markForCheck();
    });
  }

  // 2. OnPush, kullancı html üzerinden bir event tetiklendiğinde değişikliği algılar.
  onSelectFuel(fuel: GetAllFuelResponse) {
    this.selectedFuel = this.selectedFuel?.id !== fuel.id ? fuel : null;
    this.selectFuel.emit(this.selectedFuel);
  }
}
