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
import { ConfirmationPopUpComponent } from '../../../../shared/components/confirmation-pop-up/confirmation-pop-up.component';

@Component({
  selector: 'app-brands-list-table',
  standalone: true,
  imports: [
    CommonModule,
    TableDirective,
    ButtonComponent,
    RouterModule,
    ConfirmationPopUpComponent,
  ],
  templateUrl: './brands-list-table.component.html',
  styleUrl: './brands-list-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsListTableComponent extends BrandsListBaseComponent {
  showDeleteConfirmation: boolean = false;
  deletingBrandId: number | null = null;

  constructor(
    brandsService: BrandControllerService,
    change: ChangeDetectorRef
  ) {
    // Alt sınıfta bir constructor tanımlandığında super() ile üst sınıfın constructor'ı da çağrılmalıdır.
    super(brandsService, change); // super ana sınıfın constructor'ını çağırır.
  }

  deleteBrand(id: number) {
    this.deletingBrandId = id;
    this.showDeleteConfirmation = true;
  }

  onDeleteConfirm() {
    if (this.deletingBrandId !== null) {
      this.brandsService.deleteBrand({ id: this.deletingBrandId }).subscribe({
        complete: () => {
          this.getBrandsList();
        },
      });
    }
    this.resetDeleteConfirmation();
  }

  onDeleteCancel() {
    this.resetDeleteConfirmation();
  }

  private resetDeleteConfirmation() {
    this.deletingBrandId = null;
    this.showDeleteConfirmation = false;
  }
}
