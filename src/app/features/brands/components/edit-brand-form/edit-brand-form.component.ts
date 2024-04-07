import { BrandsService } from './../../services/brands.service';
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
  formMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private brandsService: BrandsService,
    private brandControllerService: BrandControllerService,
<<<<<<< HEAD
    private change: ChangeDetectorRef,
    private router: Router
=======
    private change:ChangeDetectorRef,
    private router:Router
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
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
<<<<<<< HEAD
=======
      console.log(
        '🚀 ~ EditBrandFormComponent ~ this.brandsService.getBrandById ~ brand:',
        brand
      );
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
      this.form.patchValue({
        name: brand.name,
      });
    });
  }

  edit() {
    this.brandControllerService
<<<<<<< HEAD
      .update4({
        updateBrandRequest: {
          id: this.brandId,
=======
      .updateBrandById({
        id: this.brandId,
        updateBrandRequest: {
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
          name: this.form.value.name,
        },
      })
      .subscribe({
        complete: () => {
          this.formMessage = 'Brand updated successfully';
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/management', 'brands']);
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
