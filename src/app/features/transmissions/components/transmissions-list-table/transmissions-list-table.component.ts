import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { TableDirective } from '../../../../shared/directives/table.directive';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { TransmissionsListBaseComponent } from '../transmissions-list-base/transmissions-list-base.component';
import { TransmissionControllerService } from '../../../../shared/services/api';
import { ConfirmationPopUpComponent } from '../../../../shared/components/confirmation-pop-up/confirmation-pop-up.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transmissions-list-table',
  standalone: true,
  imports: [
    CommonModule,
    TableDirective,
    ButtonComponent,
    RouterModule,
    ConfirmationPopUpComponent,
  ],
  templateUrl: './transmissions-list-table.component.html',
  styleUrl: './transmissions-list-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransmissionsListTableComponent extends TransmissionsListBaseComponent {
  showDeleteConfirmation: boolean = false;
  deletingTransmissionId: number | null = null;

  constructor(
    transmissionsService: TransmissionControllerService,
    change: ChangeDetectorRef,
    toastr: ToastrService
  ) {
    // Alt sınıfta bir constructor tanımlandığında super() ile üst sınıfın constructor'ı da çağrılmalıdır.
    super(transmissionsService, change, toastr); // super ana sınıfın constructor'ını çağırır.
  }

  deleteTransmission(id: number) {
    this.deletingTransmissionId = id;
    this.showDeleteConfirmation = true;
  }

  onDeleteConfirm() {
    if (this.deletingTransmissionId !== null) {
      this.transmissionsService
        .deleteTransmission({ id: this.deletingTransmissionId })
        .subscribe({
          complete: () => {
            this.getTransmissionsList();
          },
        });
    }
    this.resetDeleteConfirmation();
    this.toastr.success('Transmission deleted successfully', 'Delete');
  }

  onDeleteCancel() {
    this.resetDeleteConfirmation();
  }

  private resetDeleteConfirmation() {
    this.deletingTransmissionId = null;
    this.showDeleteConfirmation = false;
  }
}
