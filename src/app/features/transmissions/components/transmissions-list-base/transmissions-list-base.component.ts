import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  GetAllTransmissionResponse,
  TransmissionControllerService,
} from '../../../../shared/services/api';

@Component({
  selector: 'app-transmissions-list-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transmissions-list-base.component.html',
  styleUrl: './transmissions-list-base.component.scss',
})
export class TransmissionsListBaseComponent {
  @Input() initialSelectedTransmissionId: number | null = null; // 1. OnPush, yönteminde input değerlerinde değişiklik olduğunda değişikliği algılar.
  @Output() selectTransmission =
    new EventEmitter<GetAllTransmissionResponse | null>();

  transmissions!: GetAllTransmissionResponse[];
  selectedTransmission: GetAllTransmissionResponse | null = null;
  initialSelectedTransmissionIndex: number | null = null;

  constructor(
    protected transmissionsService: TransmissionControllerService,
    protected change: ChangeDetectorRef
  ) {}

  // ngOnInit component ilk yerleştiğinde bir kez çalışır.
  // 2. OnPush, lifecycle hookları tetiklendiğinde değişikliği algılar.
  ngOnInit(): void {
    this.getTransmissionsList();
  }

  getTransmissionsList() {
    this.transmissionsService.getAllTransmissions().subscribe((response) => {
      this.transmissions = response.sort((a, b) => {
        // a.name ve b.name ile öğelerin isimlerine erişin ve karşılaştırın
        if (a.name && b.name) {
          return a.name.localeCompare(b.name); // String isimlerine göre sıralama
        }
        return 0; // İsimlerden biri yoksa veya null ise sıralama yapma
      });

      if (this.initialSelectedTransmissionId) {
        this.selectedTransmission =
          this.transmissions.find(
            (transmission) =>
              transmission.id === this.initialSelectedTransmissionId
          ) ?? null;
        this.initialSelectedTransmissionIndex = this.transmissions.findIndex(
          (transmission) =>
            transmission.id === this.initialSelectedTransmissionId
        );
      }

      // 3. OnPush, ChangeDetectorRef.markForCheck metodu ile componentin değişiklikleri algılaması sağlanır.
      this.change.markForCheck();
    });
  }

  // 2. OnPush, kullancı html üzerinden bir event tetiklendiğinde değişikliği algılar.
  onSelectTransmission(transmission: GetAllTransmissionResponse) {
    this.selectedTransmission =
      this.selectedTransmission?.id !== transmission.id ? transmission : null;
    this.selectTransmission.emit(this.selectedTransmission);
  }
}
