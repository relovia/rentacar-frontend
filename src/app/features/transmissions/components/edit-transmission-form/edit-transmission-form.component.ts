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
import { Router } from '@angular/router';
import { TransmissionControllerService } from '../../../../shared/services/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-transmission-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './edit-transmission-form.component.html',
  styleUrl: './edit-transmission-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTransmissionFormComponent implements OnInit {
  @Input() transmissionId!: number;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transmissionsService: TransmissionControllerService,
    private change: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getTransmission();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  getTransmission() {
    this.transmissionsService
      .getTransmissionById({ id: this.transmissionId })
      .subscribe((transmission) => {
        this.form.patchValue({
          name: transmission.name,
        });
      });
  }

  edit() {
    this.transmissionsService
      .updateTransmission({
        updateTransmissionRequest: {
          id: this.transmissionId,
          name: this.form.value.name,
        },
      })
      .subscribe({
        complete: () => {
          this.toastr.success('Transmission updated successfully', 'Success');
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/management', 'transmissions']);
          }, 2000);
        },
      });
  }

  onFormSubmit() {
    if (this.form.invalid) {
      this.toastr.warning('Please fill the form correctly', 'Warning');
      return;
    }

    this.edit();
  }
}
