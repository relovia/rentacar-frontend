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
  CreateTransmissionRequestParams,
  TransmissionControllerService,
} from '../../../../shared/services/api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-transmission-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './add-transmission-form.component.html',
  styleUrl: './add-transmission-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransmissionFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private transmissionServices: TransmissionControllerService,
    private change: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  add() {
    const request: CreateTransmissionRequestParams = {
      createTransmissionRequest: {
        name: this.form.value.name,
      },
    };

    this.transmissionServices.createTransmission(request).subscribe({
      // Next: Observable'dan gelen veriyi yakaladığımız fonksiyon
      next: (response) => {
        console.log(response);
      },
      // Error: Observable'dan gelen hatayı yakaladığımız fonksiyon
      error: (error) => {
        this.toastr.error(
          'An error occurred while adding transmission',
          'Error'
        );
        this.change.markForCheck();
      },
      // Complete: Observable'dan gelen veri akışının tamamladığını bildiren fonksiyon, eğer complete çalışırsa observable'dan gelen veri akışı sona erer.
      complete: () => {
        this.toastr.success('Transmission added successfully', 'Success');
        this.form.reset();
        this.change.markForCheck();

        setTimeout(() => {
          this.router.navigate(['/management', 'transmissions']);
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
