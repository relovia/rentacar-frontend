import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AuthenticationControllerService,
  RegisterRequestParams,
} from '../../../shared/services/api';
import { Router, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../../../shared/layouts/home-layout/home-layout.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HomeLayoutComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent implements OnInit {
  form!: FormGroup;
  formMessage: string | null = null;
  isSuccessful: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthenticationControllerService,
    private change: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      identityNumber: ['', Validators.required],
      companyName: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      city: ['', Validators.required],
    });
  }

  add() {
    const request: RegisterRequestParams = {
      registerRequest: {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        password: this.form.value.password,
        identityNumber: this.form.value.identityNumber,
        companyName: this.form.value.companyName,
        phoneNumber: this.form.value.phoneNumber,
        city: this.form.value.city,
      },
    };

    this.authServices.register(request).subscribe({
      // Next: Observable'dan gelen veriyi yakaladığımız fonksiyon
      next: (response) => {
        console.log(response);
        this.isSuccessful = true;
        this.formMessage = 'Registration successful';
        this.form.reset();
        this.change.markForCheck();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      // Error: Observable'dan gelen hatayı yakaladığımız fonksiyon
      error: (error) => {
        console.log('Registration error: ', error);
        this.isSuccessful = false;
        this.formMessage = error.errorMessage || 'Registration failed';
        this.change.markForCheck();
      },
    });
  }

  onFormSubmit() {
    if (this.form.invalid) {
      this.isSuccessful = false;
      this.formMessage = 'Please fill all required fields';
      return;
    }
    this.add();
  }
}
