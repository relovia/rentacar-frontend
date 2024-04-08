import { BrandControllerService } from './../../../../shared/services/api/api/brand-controller.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { BrandsListBaseComponent } from '../brands-list-base/brands-list-base.component';
import { TableDirective } from '../../../../shared/directives/table.directive';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { BrandsService } from '../../services/brands.service';

@Component({
  selector: 'app-brands-list-table',
  standalone: true,
  imports: [CommonModule, TableDirective, ButtonComponent, RouterModule],
  templateUrl: './brands-list-table.component.html',
  styleUrl: './brands-list-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsListTableComponent extends BrandsListBaseComponent {
  constructor(
    brandsService: BrandsService,
    change: ChangeDetectorRef,
    private brandControllerService: BrandControllerService
  ) {
    // Alt sınıfta bir constructor tanımlandığında super() ile üst sınıfın constructor'ı da çağrılmalıdır.

    super(brandsService, change); // super ana sınıfın constructor'ını çağırır.
  }

  deleteBrand(id: number) {
    this.brandControllerService.delete4({ id }).subscribe({
      complete: () => {
        this.getBrandsList();
      },
    });
  }
}
