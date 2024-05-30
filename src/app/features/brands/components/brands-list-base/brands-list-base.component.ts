import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  BrandControllerService,
  GetAllBrandResponse,
} from '../../../../shared/services/api';

@Component({
  selector: 'app-brands-list-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-list-base.component.html',
  styleUrl: './brands-list-base.component.scss',
})
export class BrandsListBaseComponent {
  // 1. OnPush, yönteminde input değerlerinde değişiklik olduğunda değişikliği algılar.
  @Input() initialSelectedBrandId: number | null = null;
  @Output() selectBrand = new EventEmitter<GetAllBrandResponse | null>();

  brands!: GetAllBrandResponse[];
  selectedBrand: GetAllBrandResponse | null = null;
  initialSelectedBrandIndex: number | null = null;

  constructor(
    protected brandsService: BrandControllerService,
    private change: ChangeDetectorRef
  ) {}

  // 2. OnPush, lifecycle hookları tetiklendiğinde değişikliği algılar.
  ngOnInit(): void {
    this.getBrandsList();
  }

  // BrandsListBaseComponent.html üzerinden bir event tetiklendiğinde değişikliği algılar.
  getBrandsList() {
    this.brandsService
      .getAllBrands()
      .subscribe((response: GetAllBrandResponse[]) => {
        this.brands = response.sort((a, b) => {
          // a.name ve b.name ile öğelerin isimlerine erişir ve karşılaştırır
          if (a.name && b.name) {
            return a.name.localeCompare(b.name); // String isimlerine göre sıralama
          }
          return 0; // İsimlerden biri yoksa veya null ise sıralama yapma
        });

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
