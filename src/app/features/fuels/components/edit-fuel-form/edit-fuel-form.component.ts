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
import { FuelControllerService } from '../../../../shared/services/api';

@Component({
  selector: 'app-edit-fuel-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './edit-fuel-form.component.html',
  styleUrl: './edit-fuel-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFuelFormComponent implements OnInit {
  @Input() fuelId!: number;

  form!: FormGroup;
  formMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private fuelsService: FuelControllerService,
    private change: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getFuel();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  getFuel() {
    this.fuelsService.getFuelById({ id: this.fuelId }).subscribe((fuel) => {
      this.form.patchValue({
        name: fuel.name,
      });
    });
  }

  edit() {
    this.fuelsService
      .updateFuel({
        updateFuelRequest: {
          id: this.fuelId,
          name: this.form.value.name,
        },
      })
      .subscribe({
        complete: () => {
          this.formMessage = 'Fuel updated successfully';
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/management', 'fuels']);
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
