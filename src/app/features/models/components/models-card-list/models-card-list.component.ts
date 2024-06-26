import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  BrandControllerService,
  CarControllerService,
  FuelControllerService,
  GetAllBrandResponse,
  GetAllCarResponse,
  GetAllFuelResponse,
  GetAllModelResponse,
  GetAllTransmissionResponse,
  ModelControllerService,
  TransmissionControllerService,
} from '../../../../shared/services/api';
import { ModelsListBaseComponent } from '../models-list-base/models-list-base.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  // Belirli filtrelere göre modelleri döndürür
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
    private carsServices: CarControllerService,
    private router: Router,
    change: ChangeDetectorRef,
    toastr: ToastrService
  ) {
    super(modelServices, change, toastr); // ModelListBaseComponent'in constructor'ını çağırır
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getModelRelations();
  }

  brands: GetAllBrandResponse[] = [];
  fuels: GetAllFuelResponse[] = [];
  transmissions: GetAllTransmissionResponse[] = [];
  cars: GetAllCarResponse[] = [];

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

    // Car
    this.carsServices.getAllCars().subscribe((cars) => {
      console.log('Cars:', cars);
      this.cars = cars;
      this.change.markForCheck();
    });
  }

  // Model kartındaki metinleri ve bilgileri hazırlar
  getModelCardText(model: GetAllModelResponse): {
    brandName: string;
    fuelName: string;
    transmissionName: string;
    dailyPrice: number;
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

    const dailyPrice =
      this.cars.find((car) => car.id === model.id)?.dailyPrice || 0;

    const imageUrl = this.modelImageUrls[model.id!];

    return {
      brandName,
      fuelName,
      transmissionName,
      dailyPrice,
      imageUrl,
    };
  }

  goToRentPage(model: GetAllModelResponse) {
    const carId = this.cars.find((car) => car.modelId === model.id)?.id;

    if (carId) {
      this.router.navigate(['/management/models/rent'], {
        queryParams: {
          prefilledCarId: carId,
        },
      });
    } else {
      console.log('Seçilen modele ait bir araç bulunamadı.');
    }
  }

  modelImageUrls: {
    [id: number]: string;
  } = {
    1: '../assets/images/car-models/audi-a3-sportback-2024.jpg',
    2: '../assets/images/car-models/honda-civic-type-r-2024.jpg',
    3: '../assets/images/car-models/ferrari-296-gts-2024.jpg',
    4: '../assets/images/car-models/alfa-romeo-giulia-quadrifoglio-2020.jpg',
    5: '../assets/images/car-models/bmw-m3-2022.jpg',
    6: '../assets/images/car-models/hyundai-elantra-2017.jpg',
    7: '../assets/images/car-models/fiat-egea-2015.jpg',
    8: '../assets/images/car-models/ford-c-max-2017.jpg',
    9: '../assets/images/car-models/jaguar-e-pace-2023.jpg',
    10: '../assets/images/car-models/toyota-corolla-e140-2010.jpg',
    11: '../assets/images/car-models/jeep-renegade-2024.jpg',
    12: '../assets/images/car-models/mazda-cx-9-2023.jpg',
    13: '../assets/images/car-models/mitsubishi-lancer-evolution-ix-2006.jpg',
    14: '../assets/images/car-models/porsche-718-cayman-2024.jpg',
    15: '../assets/images/car-models/tesla-model-y-2024.jpg',
    16: '../assets/images/car-models/togg-t10x-2024.jpg',
    17: '../assets/images/car-models/volkswagen-tiguan-2024.jpg',
    18: '../assets/images/car-models/volvo-xc90-2024.jpg',
    19: '../assets/images/car-models/skoda-superb-2024.jpg',
    20: '../assets/images/car-models/opel-corsa-2024.jpg',
  };
}
