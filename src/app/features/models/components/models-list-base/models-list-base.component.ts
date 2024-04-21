import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  GetAllModelResponse,
  ModelControllerService,
} from '../../../../shared/services/api';

@Component({
  selector: 'app-models-list-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './models-list-base.component.html',
  styleUrl: './models-list-base.component.scss',
})
export class ModelsListBaseComponent {
  @Input() initialSelectedModelId: number | null = null; // 1. OnPush, yönteminde input değerlerinde değişiklik olduğunda değişikliği algılar.
  @Output() selectModel = new EventEmitter<GetAllModelResponse | null>();

  models!: GetAllModelResponse[];
  selectedModel: GetAllModelResponse | null = null;
  initialSelectedModelIndex: number | null = null;

  constructor(
    protected modelsService: ModelControllerService,
    protected change: ChangeDetectorRef
  ) {}

  // ngOnInit component ilk yerleştiğinde bir kez çalışır.
  // 2. OnPush, lifecycle hookları tetiklendiğinde değişikliği algılar.
  ngOnInit(): void {
    this.getModelsList();
  }

  getModelsList() {
    this.modelsService.getAllModels().subscribe((GetAllModelResponse) => {
      this.models = GetAllModelResponse;

      if (this.initialSelectedModelId) {
        this.selectedModel =
          this.models.find(
            (model) => model.id === this.initialSelectedModelId
          ) ?? null;
        this.initialSelectedModelIndex = this.models.findIndex(
          (model) => model.id === this.initialSelectedModelId
        );
      }

      // 3. OnPush, ChangeDetectorRef.markForCheck metodu ile componentin değişiklikleri algılaması sağlanır.
      this.change.markForCheck();
    });
  }

  // 2. OnPush, kullancı html üzerinden bir event tetiklendiğinde değişikliği algılar.
  onSelectModel(model: GetAllModelResponse) {
    this.selectedModel = this.selectedModel?.id !== model.id ? model : null;
    this.selectModel.emit(this.selectedModel);
  }
}
