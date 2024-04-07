import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { GetAllBrandResponse } from '../../../../shared/services/api';
import { BrandsService } from '../../services/brands.service';

@Component({
  selector: 'app-brands-list-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-list-base.component.html',
  styleUrl: './brands-list-base.component.scss',
})
export class BrandsListBaseComponent {
  @Input() initialSelectedBrandId: number | null = null; // 1. OnPush, yönteminde input değerlerinde değişiklik olduğunda değişikliği algılar.
  @Output() selectBrand = new EventEmitter<GetAllBrandResponse | null>();

  brands!: GetAllBrandResponse[];
  selectedBrand: GetAllBrandResponse | null = null;
  initialSelectedBrandIndex: number | null = null;

  constructor(
    private brandsService: BrandsService,
    private change: ChangeDetectorRef
  ) {}

  // ngOnInit component ilk yerleştiğinde bir kez çalışır.
  // 2. OnPush, lifecycle hookları tetiklendiğinde değişikliği algılar.
  ngOnInit(): void {
    this.getBrandsList();
  }

  getBrandsList() {
    this.brandsService.getBrands().subscribe((GetAllBrandResponse) => {
      this.brands = GetAllBrandResponse;

      if (this.initialSelectedBrandId) {
        this.selectedBrand =
          this.brands.find(
            (brand) => brand.id === this.initialSelectedBrandId
          ) ?? null;
        this.initialSelectedBrandIndex = this.brands.findIndex(
          (brand) => brand.id === this.initialSelectedBrandId
        );
      }

      // 3. OnPush, ChangeDetectorRef.markForCheck metodu ile componentin değişiklikleri algılaması sağlanır.
      this.change.markForCheck();
    });
  }

  // 2. OnPush, kullancı html üzerinden bir event tetiklendiğinde değişikliği algılar.
  onSelectBrand(brand: GetAllBrandResponse) {
    this.selectedBrand = this.selectedBrand?.id !== brand.id ? brand : null;
    this.selectBrand.emit(this.selectedBrand);
  }
}
