import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  CarControllerService,
  CreateCarRequestParams,
} from '../../../../shared/services/api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-car-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './add-car-form.component.html',
  styleUrl: './add-car-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCarFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carServices: CarControllerService,
    private change: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
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

  add() {
    const request: CreateCarRequestParams = {
      createCarRequest: {
        modelId: this.form.value.modelId,
        modelYear: this.form.value.modelYear,
        plate: this.form.value.plate,
        dailyPrice: this.form.value.dailyPrice,
        state: this.form.value.state,
      },
    };

    this.carServices.createCar(request).subscribe({
      // Next: Observable'dan gelen veriyi yakaladığımız fonksiyon
      next: (response) => {
        console.log(response);
      },
      // Error: Observable'dan gelen hatayı yakaladığımız fonksiyon
      error: (error) => {
        this.toastr.error('An error occurred while adding car', 'Error');
        this.change.markForCheck();
      },
      // Complete: Observable'dan gelen veri akışının tamamladığını bildiren fonksiyon, eğer complete çalışırsa observable'dan gelen veri akışı sona erer.
      complete: () => {
        this.toastr.success('Car added successfully', 'Success');
        this.form.reset();
        this.change.markForCheck();

        setTimeout(() => {
          this.router.navigate(['/management', 'cars']);
        }, 2000);
      },
    });
  }

  onFormSubmit() {
    if (this.form.invalid) {
      this.toastr.warning('Please fill all required fields', 'Warning');
      return;
    }

    this.add();
  }
}
