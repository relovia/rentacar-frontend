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
import { ToastrService } from 'ngx-toastr';

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
    protected change: ChangeDetectorRef,
    protected toastr: ToastrService
  ) {}

  // ngOnInit component ilk yerleştiğinde bir kez çalışır.
  // 2. OnPush, lifecycle hookları tetiklendiğinde değişikliği algılar.
  ngOnInit(): void {
    this.getModelsList();
  }

  getModelsList() {
    this.modelsService.getAllModels().subscribe((response) => {
      this.models = response.sort((a, b) => {
        // a.name ve b.name ile öğelerin isimlerine erişin ve karşılaştırın
        if (a.name && b.name) {
          return a.name.localeCompare(b.name); // String isimlerine göre sıralama
        }
        return 0; // İsimlerden biri yoksa veya null ise sıralama yapma
      });

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
      this.toastr.success('Models loaded successfully', 'Success');
    });
  }

  // 2. OnPush, kullancı html üzerinden bir event tetiklendiğinde değişikliği algılar.
  onSelectModel(model: GetAllModelResponse) {
    this.selectedModel = this.selectedModel?.id !== model.id ? model : null;
    this.selectModel.emit(this.selectedModel);
  }
}
