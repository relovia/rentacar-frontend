import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { TableDirective } from '../../../../shared/directives/table.directive';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { ModelsListBaseComponent } from '../models-list-base/models-list-base.component';
import { ModelControllerService } from '../../../../shared/services/api';
import { ConfirmationPopUpComponent } from '../../../../shared/components/confirmation-pop-up/confirmation-pop-up.component';

@Component({
  selector: 'app-models-list-table',
  standalone: true,
  imports: [
    CommonModule,
    TableDirective,
    ButtonComponent,
    RouterModule,
    ConfirmationPopUpComponent,
  ],
  templateUrl: './models-list-table.component.html',
  styleUrl: './models-list-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelsListTableComponent extends ModelsListBaseComponent {
  showDeleteConfirmation: boolean = false;
  deletingModelId: number | null = null;

  constructor(
    modelsService: ModelControllerService,
    change: ChangeDetectorRef
  ) {
    // Alt sınıfta bir constructor tanımlandığında super() ile üst sınıfın constructor'ı da çağrılmalıdır.
    super(modelsService, change); // super ana sınıfın constructor'ını çağırır.
  }

  deleteModel(id: number) {
    this.deletingModelId = id;
    this.showDeleteConfirmation = true;
  }

  onDeleteConfirm() {
    if (this.deletingModelId !== null) {
      this.modelsService.deleteModel({ id: this.deletingModelId }).subscribe({
        complete: () => {
          this.getModelsList();
        },
      });
    }
    this.resetDeleteConfirmation();
  }

  onDeleteCancel() {
    this.resetDeleteConfirmation();
  }

  private resetDeleteConfirmation() {
    this.deletingModelId = null;
    this.showDeleteConfirmation = false;
  }
}
