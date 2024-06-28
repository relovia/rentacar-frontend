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
import { BrandControllerService } from '../../../../shared/services/api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-brand-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './edit-brand-form.component.html',
  styleUrl: './edit-brand-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBrandFormComponent implements OnInit {
  @Input() brandId!: number;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private brandsService: BrandControllerService,
    private change: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getBrand();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  getBrand() {
    this.brandsService.getBrandById({ id: this.brandId }).subscribe((brand) => {
      this.form.patchValue({
        name: brand.name,
      });
    });
  }

  edit() {
    this.brandsService
      .updateBrand({
        updateBrandRequest: {
          id: this.brandId,
          name: this.form.value.name,
        },
      })
      .subscribe({
        complete: () => {
          this.toastr.success('Brand updated successfully', 'Success');
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/management', 'brands']);
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
