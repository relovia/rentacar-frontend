import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModelsListBaseComponent } from '../models-list-base/models-list-base.component';
import {
  GetAllBrandResponse,
  GetAllCarResponse,
  GetAllModelResponse,
  GetAllTransmissionResponse,
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
  @Input() model: GetAllModelResponse | null = null;
  @Input() car: GetAllCarResponse | null = null;
  @Input() brand: GetAllBrandResponse | null = null;
  @Input() transmission: GetAllTransmissionResponse | null = null;

  brands: GetAllBrandResponse[] = [];
  transmissions: GetAllTransmissionResponse[] = [];

  override ngOnInit(): void {
    if (this.model) {
      this.getModelCardDetail(this.model);
    }
  }

  getModelCardDetail(model: GetAllModelResponse) {
    console.log('getModelCardDetail is called with model:', model);

    const foundBrand = this.brands?.find((brand) => brand.id === model.brandId);
    debugger;
    console.log('Found brand:', foundBrand);

    const foundTransmission = this.transmissions?.find(
      (transmission) => transmission.id === model.transmissionId
    );
    console.log('Found transmission:', foundTransmission);

    // Eğer bulunan marka ve şanzıman varsa, state'lere atayabiliriz
    if (foundBrand) {
      this.brand = foundBrand;
      console.log('Brand is assigned:', this.brand);
    }

    if (foundTransmission) {
      this.transmission = foundTransmission;
      console.log('Transmission is assigned:', this.transmission);
    }
  }
}
