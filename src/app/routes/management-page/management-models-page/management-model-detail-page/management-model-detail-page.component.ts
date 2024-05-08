import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModelDetailComponent } from '../../../../features/models/components/model-detail/model-detail.component';
import { ActivatedRoute } from '@angular/router';
import {
  GetAllBrandResponse,
  GetAllModelResponse,
  GetAllTransmissionResponse,
} from '../../../../shared/services/api';

@Component({
  selector: 'app-management-model-detail-page',
  standalone: true,
  imports: [CommonModule, ModelDetailComponent],
  templateUrl: './management-model-detail-page.component.html',
  styleUrl: './management-model-detail-page.component.scss',
})
export class ManagementModelDetailPageComponent implements OnInit {
  modelId!: number;
  model: GetAllModelResponse | null = null;
  brand: GetAllBrandResponse | null = null;
  transmission: GetAllTransmissionResponse | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getModelIdFromRoute();
  }

  private getModelIdFromRoute() {
    this.route.params.subscribe((params) => {
      const modelId = params['modelId'];
      if (!modelId) return;

      this.modelId = Number(modelId);
    });
  }
}
