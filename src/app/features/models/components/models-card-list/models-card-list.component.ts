import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  model,
  OnInit,
} from '@angular/core';
import {
  BrandControllerService,
  FuelControllerService,
  GetAllBrandResponse,
  GetAllFuelResponse,
  GetAllModelResponse,
  GetAllTransmissionResponse,
  ModelControllerService,
  TransmissionControllerService,
} from '../../../../shared/services/api';
import { ModelsListBaseComponent } from '../models-list-base/models-list-base.component';
import { CardComponent } from '../../../../shared/components/card/card/card.component';
import { style } from '@angular/animations';

@Component({
  selector: 'app-models-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './models-card-list.component.html',
  styleUrl: './models-card-list.component.scss',
})
export class ModelsCardListComponent
  extends ModelsListBaseComponent
  implements OnInit
{
  @Input() brandId: number | null = null;
  @Input() transmissionId: number | null = null;

  get filteredModels(): GetAllModelResponse[] {
    let newList: GetAllModelResponse[] = this.models;
    if (this.brandId) {
      newList = newList.filter((model) => model.brandId === this.brandId);
    }

    if (this.transmissionId) {
      newList = newList.filter(
        (model) => model.transmissionId === this.transmissionId
      );
    }

    return newList;
  }

  constructor(
    private modelServices: ModelControllerService,
    private brandsServices: BrandControllerService,
    private fuelsServices: FuelControllerService,
    private transmissionsServices: TransmissionControllerService,
    change: ChangeDetectorRef
  ) {
    super(modelServices, change);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getModelRelations();
  }

  brands: GetAllBrandResponse[] = [];
  fuels: GetAllFuelResponse[] = [];
  transmissions: GetAllTransmissionResponse[] = [];

  getModelRelations(): void {
    // Brand
    this.brandsServices.getAllBrands().subscribe((brands) => {
      console.log('Brands', brands);
      this.brands = brands;
      this.change.markForCheck();
    });

    // Fuel
    this.fuelsServices.getAllFuels().subscribe((fuels) => {
      console.log('Fuels:', fuels);
      this.fuels = fuels;
      this.change.markForCheck();
    });

    // Transmission
    this.transmissionsServices
      .getAllTransmissions()
      .subscribe((transmissions) => {
        console.log('Transmissions:', transmissions);
        this.transmissions = transmissions;
        this.change.markForCheck();
      });
  }

  getModelCardText(model: GetAllModelResponse): {
    brandName: string;
    fuelName: string;
    transmissionName: string;
    imageUrl: string;
  } {
    const brandName =
      this.brands.find((brand) => brand.id === model.brandId)?.name || '';
    const fuelName =
      this.fuels.find((fuel) => fuel.id === model.fuelId)?.name || '';
    const transmissionName =
      this.transmissions.find(
        (transmission) => transmission.id === model.transmissionId
      )?.name || '';
    const imageUrl = this.modelImageUrls[model.id!];

    return { brandName, fuelName, transmissionName, imageUrl };
  }
  modelImageUrls: {
    [id: number]: string;
  } = {
    1: '../assets/images/car-models/audi-a3-sportback-2024.jpg',
    6: '../assets/images/car-models/honda-civic-type-r-2024.jpg',
    7: '../assets/images/car-models/ferrari-296-gts-2024.jpg',
    8: '../assets/images/car-models/alfa-romeo-giulia-quadrifoglio-2020.jpg',
    9: '../assets/images/car-models/bmw-m3-2022.jpg',
    10: '../assets/images/car-models/hyundai-elantra-2017.jpg',
    11: '../assets/images/car-models/fiat-egea-2015.jpg',
    12: '../assets/images/car-models/ford-c-max-2017.jpg',
    13: '../assets/images/car-models/jaguar-e-pace-2023.jpg',
    14: '../assets/images/car-models/toyota-corolla-e140-2010.jpg',
    15: '../assets/images/car-models/jeep-renegade-2024.jpg',
    16: '../assets/images/car-models/mazda-cx-9-2023.jpg',
    17: '../assets/images/car-models/mitsubishi-lancer-evolution-ix-2006.jpg',
    18: '../assets/images/car-models/porsche-718-cayman-2024.jpg',
    19: '../assets/images/car-models/tesla-model-y-2024.jpg',
    20: '../assets/images/car-models/togg-t10x-2024.jpg',
    21: '../assets/images/car-models/volkswagen-tiguan-2024.jpg',
    22: '../assets/images/car-models/volvo-xc90-2024.jpg',
    23: '../assets/images/car-models/skoda-superb-2024.jpg',
    24: '../assets/images/car-models/opel-corsa-2024.jpg',
  };
}
