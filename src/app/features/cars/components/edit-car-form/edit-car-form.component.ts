import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CarControllerService } from '../../../../shared/services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-car-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './edit-car-form.component.html',
  styleUrl: './edit-car-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCarFormComponent implements OnInit {
  @Input() carId!: number;

  form!: FormGroup;
  formMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private carsService: CarControllerService,
    private change: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getCar();
  }

  createForm() {
    this.form = this.formBuilder.group({
      modelId: ['', [Validators.required]],
      modelYear: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      dailyPrice: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  getCar() {
    this.carsService.getCarById({ id: this.carId }).subscribe((car) => {
      this.form.patchValue({
        modelId: car.modelId,
        modelName: car.modelName,
        modelYear: car.modelYear,
        plate: car.plate,
        dailyPrice: car.dailyPrice,
        state: car.state,
      });
    });
  }

  edit() {
    if (this.form.invalid) {
      this.formMessage = 'Please fill the form correctly';
      return;
    }

    this.carsService
      .updateCar({
        updateCarRequest: {
          id: this.carId,
          plate: this.form.value.plate,
          state: this.form.value.state,
          dailyPrice: this.form.value.dailyPrice,
        },
      })
      .subscribe({
        complete: () => {
          this.formMessage = 'Car updated successfully';
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/management', 'cars']);
          }, 2000);
        },
      });
  }

  onFormSubmit() {
    if (this.form.invalid) {
      this.formMessage = 'Please fill the form correctly';
      return;
    }

    this.edit();
  }
}
