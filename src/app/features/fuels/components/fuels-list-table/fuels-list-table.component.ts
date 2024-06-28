import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { TableDirective } from '../../../../shared/directives/table.directive';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { FuelsListBaseComponent } from '../fuels-list-base/fuels-list-base.component';
import { FuelControllerService } from '../../../../shared/services/api';
import { ConfirmationPopUpComponent } from '../../../../shared/components/confirmation-pop-up/confirmation-pop-up.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fuels-list-table',
  standalone: true,
  imports: [
    CommonModule,
    TableDirective,
    ButtonComponent,
    RouterModule,
    ConfirmationPopUpComponent,
  ],
  templateUrl: './fuels-list-table.component.html',
  styleUrl: './fuels-list-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuelsListTableComponent extends FuelsListBaseComponent {
  showDeleteConfirmation: boolean = false;
  deletingFuelId: number | null = null;

  constructor(
    fuelsService: FuelControllerService,
    change: ChangeDetectorRef,
    toastr: ToastrService
  ) {
    // Alt sınıfta bir constructor tanımlandığında super() ile üst sınıfın constructor'ı da çağrılmalıdır.
    super(fuelsService, change, toastr); // super ana sınıfın constructor'ını çağırır.
  }

  deleteFuel(id: number) {
    this.deletingFuelId = id;
    this.showDeleteConfirmation = true;
  }

  onDeleteConfirm() {
    if (this.deletingFuelId !== null) {
      this.fuelsService.deleteFuel({ id: this.deletingFuelId }).subscribe({
        complete: () => {
          this.getFuelsList();
        },
      });
    }
    this.resetDeleteConfirmation();
    this.toastr.success('Fuel deleted successfully', 'Delete');
  }

  onDeleteCancel() {
    this.resetDeleteConfirmation();
  }

  private resetDeleteConfirmation() {
    this.deletingFuelId = null;
    this.showDeleteConfirmation = false;
  }
}
