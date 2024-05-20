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
    console.log(newList);
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
    text: string;
    imageUrl: string;
  } {
    const brandName = this.brands.find(
      (brand) => brand.id === model.brandId
    )?.name;
    this.brands.sort((a, b) => a.id! - b.id!);

    const fuelName = this.fuels.find((fuel) => fuel.id === model.fuelId)?.name;
    this.fuels.sort((a, b) => a.id! - b.id!);

    const transmissionName = this.transmissions.find(
      (transmission) => transmission.id === model.transmissionId
    )?.name;
    this.transmissions.sort((a, b) => a.id! - b.id!);

    const text = `
                  Brand: ${brandName || 'Unknown'}
                 | Fuel: ${fuelName || 'Unknown'} 
                 | Transmission: ${transmissionName || 'Unknown'}
                 | Color: ${model.color}`;
    const imageUrl = this.modelImageUrls[model.id!];

    return { text, imageUrl };
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
  };
}
