import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModelControllerService } from '../../../../shared/services/api';
import { ModelsListBaseComponent } from '../models-list-base/models-list-base.component';

@Component({
  selector: 'app-models-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './models-card-list.component.html',
  styleUrl: './models-card-list.component.scss',
})
export class ModelsCardListComponent
  extends ModelsListBaseComponent
  implements OnInit
{
  constructor(
    private modelServices: ModelControllerService,
    change: ChangeDetectorRef
  ) {
    super(modelServices, change);
  }
}
