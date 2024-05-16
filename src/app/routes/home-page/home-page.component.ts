import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeLayoutComponent } from '../../shared/layouts/home-layout/home-layout.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BrandsListMenuComponent } from '../../features/brands/components/brands-list-menu/brands-list-menu.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  GetAllBrandResponse,
  GetAllTransmissionResponse,
} from '../../shared/services/api';
import { ModelsCardListComponent } from '../../features/models/components/models-card-list/models-card-list.component';
import { TransmissionsListMenuComponent } from '../../features/transmissions/components/transmissions-list-menu/transmissions-list-menu.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HomeLayoutComponent,
    ButtonComponent,
    BrandsListMenuComponent,
    RouterModule,
    ModelsCardListComponent,
    TransmissionsListMenuComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  selectedBrandId: number | null = null;
  selectedTransmissionId: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Lifecycle hook // Component ilk oluşturulduğunda çalışır
    this.getSelectedBrandIdFromRoute();
    this.getSelectedTransmissionIdFromRoute();
  }

  // /brand/1 // Route params
  // ?brandId=1 // Query params
  getSelectedBrandIdFromRoute() {
    this.route.queryParams.subscribe((params) => {
      if (
        params['brandId'] &&
        this.selectedBrandId !== Number.parseInt(params['brandId'])
      )
        this.selectedBrandId = Number.parseInt(params['brandId']);
    });
  }

  onSelectBrand(selectedBrand: GetAllBrandResponse | null) {
    this.selectedBrandId = selectedBrand?.id ?? null;

    if (this.selectedBrandId !== null) {
      this.router.navigate([''], {
        queryParams: {
          brandId: this.selectedBrandId, // ?brandId=1
          // brandId: [1, 2] // ?brandId=1&brandId=2
        },
      });
    } else this.router.navigate(['']);
  }

  onSelectTransmission(
    selectedTransmission: GetAllTransmissionResponse | null
  ) {
    this.selectedTransmissionId = selectedTransmission?.id ?? null;

    if (this.selectedTransmissionId !== null) {
      this.router.navigate([''], {
        queryParams: {
          transmissionId: this.selectedTransmissionId,
        },
      });
    } else this.router.navigate(['']);
  }

  getSelectedTransmissionIdFromRoute() {
    this.route.queryParams.subscribe((params) => {
      if (
        params['transmissionId'] &&
        this.selectedTransmissionId !==
          Number.parseInt(params['transmissionId'])
      )
        this.selectedTransmissionId = Number.parseInt(params['transmissionId']);
    });
  }
}
