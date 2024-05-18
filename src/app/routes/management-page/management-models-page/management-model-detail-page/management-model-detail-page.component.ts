import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModelDetailComponent } from '../../../../features/models/components/model-detail/model-detail.component';
import { ActivatedRoute } from '@angular/router';
import {
  BrandControllerService,
  CarControllerService,
  GetAllBrandResponse,
  GetAllCarResponse,
  GetAllModelResponse,
  GetAllTransmissionResponse,
  GetModelByIdRequestParams,
  ModelControllerService,
  TransmissionControllerService,
} from '../../../../shared/services/api';

@Component({
  selector: 'app-management-model-detail-page',
  standalone: true,
  imports: [CommonModule, ModelDetailComponent],
  templateUrl: './management-model-detail-page.component.html',
  styleUrls: ['./management-model-detail-page.component.scss'],
})
export class ManagementModelDetailPageComponent implements OnInit {
  modelId!: number;
  model!: GetAllModelResponse;
  brand!: GetAllBrandResponse;
  transmission!: GetAllTransmissionResponse;
  car!: GetAllCarResponse;

  constructor(
    private route: ActivatedRoute,
    private modelsService: ModelControllerService,
    private brandsService: BrandControllerService,
    private transmissionsService: TransmissionControllerService,
    private carsService: CarControllerService
  ) {}

  ngOnInit(): void {
    this.getModelIdFromRoute();
  }

  private getModelIdFromRoute() {
    this.route.params.subscribe((params) => {
      const modelId = params['modelId'];
      if (!modelId) return;

      this.modelId = Number(modelId);

      this.fetchModelDetails(this.modelId);
    });
  }

  private fetchModelDetails(modelId: number) {
    const modelParams: GetModelByIdRequestParams = {
      id: modelId,
    };
    this.modelsService.getModelById(modelParams).subscribe((model) => {
      if (model) {
        this.model = model;
        console.log('Fetched model:', this.model);

        if (model.brandId !== undefined) {
          this.fetchBrandDetails(model.brandId);
        }

        if (model.transmissionId !== undefined) {
          this.fetchTransmissionDetails(model.transmissionId);
        }

        if (model.id !== undefined) {
          this.fetchCarDetails(model.id);
        }
      }
    });
  }

  private fetchBrandDetails(brandId: number) {
    this.brandsService.getAllBrands().subscribe((brands) => {
      const brand = brands.find((brand) => brand.id === brandId);
      if (brand) {
        this.brand = brand;
        console.log('Fetched brand:', this.brand);
      }
    });
  }

  private fetchTransmissionDetails(transmissionId: number) {
    this.transmissionsService
      .getAllTransmissions()
      .subscribe((transmissions) => {
        const transmission = transmissions.find(
          (transmission) => transmission.id === transmissionId
        );
        if (transmission) {
          this.transmission = transmission;
          console.log('Fetched transmission:', this.transmission);
        }
      });
  }

  private fetchCarDetails(modelId: number) {
    this.carsService.getAllCars().subscribe((cars) => {
      const car = cars.find((car) => car.modelId === modelId);
      if (car) {
        this.car = car;
        console.log('Fetched car:', this.car);
      }
    });
  }
}
