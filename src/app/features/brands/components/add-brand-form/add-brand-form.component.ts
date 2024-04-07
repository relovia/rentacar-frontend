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
<<<<<<< HEAD
  Add4RequestParams,
  BrandControllerService,
} from '../../../../shared/services/api';
import { Router } from '@angular/router';
=======
  BrandControllerService,
  CreateBrandRequestParams,
} from '../../../../shared/services/api';
import { Router, RouterModule } from '@angular/router';
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd

@Component({
  selector: 'app-add-brand-form',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
=======
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    RouterModule
  ],
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
  templateUrl: './add-brand-form.component.html',
  styleUrl: './add-brand-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBrandFormComponent implements OnInit {
  form!: FormGroup;
  formMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
<<<<<<< HEAD
    private brandServices: BrandControllerService,
=======
    private brandsService: BrandControllerService,
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
    private change: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
<<<<<<< HEAD
=======
    // this.form = new FormGroup({
    //   name: new FormControl('', [Validators.required]),
    //   description: new FormControl('', [Validators.required]),
    //   isActive: new FormControl(true, [Validators.required]),
    // });
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  add() {
<<<<<<< HEAD
    const request: Add4RequestParams = {
=======
    const request: CreateBrandRequestParams = {
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
      createBrandRequest: {
        name: this.form.value.name,
      },
    };
<<<<<<< HEAD

    this.brandServices.add4(request).subscribe({
      // Next: Observable'dan gelen veriyi yakaladığımız fonksiyon
      next: (response) => {
        console.log(response);
      },
      // Error: Observable'dan gelen hatayı yakaladığımız fonksiyon
      error: (error) => {
        this.formMessage = error.errorMessage;
        this.change.markForCheck();
      },
      // Complete: Observable'dan gelen veri akışının tamamladığını bildiren fonksiyon, eğer complete çalışırsa observable'dan gelen veri akışı sona erer.
      complete: () => {
        this.formMessage = 'Brand added successfully';
        this.form.reset();
        this.change.markForCheck();
=======
    this.brandsService.createBrand(request).subscribe({
      next: (response) => {
        // Next: Observable'dan gelen veri yakaladığımız fonksiyon
        console.log(response);
      },
      error: (error) => {
        // Error: Observable'dan gelen hata yakaladığımız fonksiyon
        this.formMessage = error.error.message;
        this.change.markForCheck(); // OnPush olduğu için bir sonraki bir olaya kadar değişikliği algılamaz. Böylece biz manuel olarak değişikliği algılamasını sağlıyoruz.
      },
      complete: () => {
        // Complete: Observable'dan gelen veri akışının tamamlandığını bildiren fonksiyon. Complete çalıştığı taktirde observable'dan gelen veri akışı sona erer.
        this.formMessage = 'Brand added successfully';
        this.change.markForCheck();

        setTimeout(() => {
          this.router.navigate(['/management', 'brands']);
        }, 2000);
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
      },
    });
  }

  onFormSubmit() {
    if (this.form.invalid) {
      this.formMessage = 'Please fill all required fields';
      return;
    }

    this.add();
  }
}
