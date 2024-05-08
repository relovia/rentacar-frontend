import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
export class ModelDetailComponent extends ModelsListBaseComponent {
  @Input() model: GetAllModelResponse | null = null;
  @Input() car: GetAllCarResponse | null = null;
  @Input() brand: GetAllBrandResponse | null = null;
  @Input() transmission: GetAllTransmissionResponse | null = null;

  brands: GetAllBrandResponse[] = [];
  transmissions: GetAllTransmissionResponse[] = [];

  getModelCardDetail(model: GetAllModelResponse) {
    this.brands?.find((brands) => brands.id === model.brandId);
    this.transmissions?.find(
      (transmission) => transmission.id === model.transmissionId
    );
  }
}
