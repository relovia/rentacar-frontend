import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModelsListBaseComponent } from '../models-list-base/models-list-base.component';
import {
  BrandControllerService,
  CarControllerService,
  GetAllBrandResponse,
  GetAllCarResponse,
  GetAllModelResponse,
  GetAllTransmissionResponse,
  ModelControllerService,
  TransmissionControllerService,
} from '../../../../shared/services/api';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-model-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './model-detail.component.html',
  styleUrl: './model-detail.component.scss',
})
export class ModelDetailComponent
  extends ModelsListBaseComponent
  implements OnInit
{
  modelId!: number;
  @Input() model!: GetAllModelResponse;
  @Input() brand!: GetAllBrandResponse;
  @Input() transmission!: GetAllTransmissionResponse;
  @Input() car!: GetAllCarResponse;

  constructor(
    modelsService: ModelControllerService,
    private brandsService: BrandControllerService,
    private transmissionsService: TransmissionControllerService,
    private carsService: CarControllerService,
    private router: Router,
    change: ChangeDetectorRef
  ) {
    super(modelsService, change); // Call base class constructor with required services
  }

  override ngOnInit(): void {
    console.log('model', this.model);
    console.log('brand', this.brand);
    console.log('transmission', this.transmission);
    console.log('car', this.car);

    this.change.markForCheck();

    if (this.modelId) {
      this.fetchModelDetails(this.model?.id!);
    }
    if (this.brand) {
      this.fetchBrandDetails(this.brand.id!);
    }
    if (this.transmission) {
      this.fetchTransmissionDetails(this.transmission.id!);
    }
    if (this.car) {
      this.fetchCarDetails(this.car.modelId!);
    }
  }

  // Model
  private fetchModelDetails(modelId: number) {
    this.modelsService.getAllModels().subscribe((models) => {
      const model = models.find((model) => model.id === modelId);
      this.model = model!;
      console.log('Fetched model:', this.model);
    });
  }

  // Brand
  private fetchBrandDetails(brandId: number) {
    this.brandsService.getAllBrands().subscribe((brands) => {
      const brand = brands.find((brand) => brand.id === brandId);
      this.brand = brand!;
      console.log('Fetched brand:', this.brand);
    });
  }

  // Transmission
  private fetchTransmissionDetails(transmissionId: number) {
    this.transmissionsService
      .getAllTransmissions()
      .subscribe((transmissions) => {
        const transmission = transmissions.find(
          (transmission) => transmission.id === transmissionId
        );
        this.transmission = transmission!;
        console.log('Fetched transmission:', this.transmission);
      });
  }

  // Car
  private fetchCarDetails(modelId: number) {
    this.carsService.getAllCars().subscribe((cars) => {
      const car = cars.find((car) => car.modelId === modelId);
      this.car = car!;
      console.log('Fetched car:', this.car);
    });
  }

  goRentPage() {
    this.router.navigate(['/management/models/rent'], {
      queryParams: { prefilledCarId: this.car.id },
    });
  }
}
