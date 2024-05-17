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
  GetBrandByIdRequestParams,
  GetCarByIdRequestParams,
  GetModelByIdRequestParams,
  GetTransmissionByIdRequestParams,
  ModelControllerService,
  TransmissionControllerService,
} from '../../../../shared/services/api';
import { RouterModule } from '@angular/router';

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
  @Input() model: GetAllModelResponse | null = null;
  @Input() brand: GetAllBrandResponse | null = null;
  @Input() transmission: GetAllTransmissionResponse | null = null;
  @Input() car: GetAllCarResponse | null = null;

  brands: GetAllBrandResponse[] = [];
  transmissions: GetAllTransmissionResponse[] = [];

  constructor(
    modelsService: ModelControllerService,
    private brandsService: BrandControllerService,
    private transmissionsService: TransmissionControllerService,
    private carsService: CarControllerService,
    change: ChangeDetectorRef
  ) {
    super(modelsService, change); // Call base class constructor with required services
  }

  override ngOnInit(): void {
    this.getModelCardDetail(this.model!);
    this.fetchBrandDetails(this.model!.brandId!);
    this.fetchTransmissionDetails(this.model!.transmissionId!);
    this.fetchCarDetails(this.model!.id!);
    this.change.markForCheck();
  }

  private getModelCardDetail(model: GetAllModelResponse): void {
    if (!model) {
      return;
    }

    let modelParams: GetModelByIdRequestParams;

    if (model.id !== undefined) {
      modelParams = {
        id: model.id,
      };

      this.modelsService.getModelById(modelParams).subscribe((model) => {
        this.model = model;
        console.log('Fetched model:', this.model);

        if (model.brandId !== undefined) {
          this.fetchBrandDetails(model.brandId);
          console.log('Brand Id:', model.brandId);
        }

        if (model.transmissionId !== undefined) {
          this.fetchTransmissionDetails(model.transmissionId);
          console.log('Transmission Id:', model.transmissionId);
        }

        if (model.id !== undefined) {
          this.fetchCarDetails(model.id);
          console.log('Car Id:', model.id);
        }
      });
    }
  }

  // Brand
  private fetchBrandDetails(brandId: number) {
    const brandParams: GetBrandByIdRequestParams = {
      id: brandId,
    };

    this.brandsService.getBrandById(brandParams).subscribe(
      (brand) => {
        this.brand = brand;
        console.log('Fetched brand:', this.brand);
      },
      (error) => {
        console.error('Error fetching brand:', error);
      }
    );
  }

  // Transmission
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

  // Car
  private fetchCarDetails(carId: number) {
    const carParams: GetCarByIdRequestParams = {
      id: carId,
    };

    this.carsService.getCarById(carParams).subscribe((car) => {
      this.car = car;
      console.log('Fetched car:', this.car);
    });
  }
}
