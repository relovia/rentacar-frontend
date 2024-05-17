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
  GetBrandByIdRequestParams,
  GetModelByIdRequestParams,
  GetTransmissionByIdRequestParams,
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
  model: GetAllModelResponse | null = null;
  brand: GetAllBrandResponse | null = null;
  transmission: GetAllTransmissionResponse | null = null;
  car: GetAllCarResponse | null = null;

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
    });
  }

  private fetchBrandDetails(brandId: number) {
    const brandParams: GetBrandByIdRequestParams = {
      id: brandId,
    };
    this.brandsService.getBrandById(brandParams).subscribe((brand) => {
      this.brand = brand;
      console.log('Fetched brand:', this.brand);
    });
  }

  private fetchTransmissionDetails(transmissionId: number) {
    const transmissionParams: GetTransmissionByIdRequestParams = {
      id: transmissionId,
    };
    this.transmissionsService
      .getTransmissionById(transmissionParams)
      .subscribe((transmission) => {
        this.transmission = transmission;
        console.log('Fetched transmission:', this.transmission);
      });
  }

  private fetchCarDetails(modelId: number) {
    this.carsService.getAllCars().subscribe((cars) => {
      const car = cars.find((car) => car.modelId === modelId);
      this.car = car || null;
      console.log('Fetched car:', this.car);
    });
  }
}
