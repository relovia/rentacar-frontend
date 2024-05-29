import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  AuthenticationControllerService,
  LoginRequestParams,
} from '../../../shared/services/api';
import { TokenService } from '../../../shared/services/token/token.service';
import { HomeLayoutComponent } from '../../../shared/layouts/home-layout/home-layout.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HomeLayoutComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  formMessage: string | null = null;
  isSuccessful: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthenticationControllerService,
    private change: ChangeDetectorRef,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const request: LoginRequestParams = {
      loginRequest: {
        email: this.form.value.email,
        password: this.form.value.password,
      },
    };

    console.log('Request: ', request);

    this.authServices.login(request).subscribe({
      // Next: Observable'dan gelen veriyi yakaladığımız fonksiyon
      next: (response) => {
        this.tokenService.setToken(response.token as string);
        this.isSuccessful = true;
        this.formMessage = 'Login successful';
        this.form.reset();
        this.change.markForCheck();

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      // Error: Observable'dan gelen hatayı yakaladığımız fonksiyon
      error: (error) => {
        console.log('Login error: ', error);
        this.isSuccessful = false;
        this.formMessage = error.errorMessage || 'Login failed';
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
    this.login();
  }
}
