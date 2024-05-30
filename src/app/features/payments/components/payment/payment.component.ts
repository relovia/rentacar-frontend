import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CarControllerService,
  GetAllCarResponse,
} from '../../../../shared/services/api';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  form!: FormGroup;
  cars: GetAllCarResponse[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carServices: CarControllerService
  ) {}

  ngOnInit(): void {
    // Formu oluşturur ve validasyon kurallarını ekler
    this.form = this.formBuilder.group({
      cardNumberControl: [
        '',
        [Validators.required, Validators.pattern(/^\d{16}$/)],
      ],
      expiryDateControl: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
        ],
      ],
      cvvControl: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      nameOnCardControl: ['', Validators.required],
    });
  }

  // API'deki tüm araç verilerini alır
  getCarDetails() {
    this.carServices.getAllCars().subscribe((res) => {
      this.cars = res;
    });
  }

  get cardNumberControl() {
    return this.form.get('cardNumberControl');
  }

  get expiryDateControl() {
    return this.form.get('expiryDateControl');
  }

  get cvvControl() {
    return this.form.get('cvvControl');
  }

  get nameOnCardControl() {
    return this.form.get('nameOnCardControl');
  }

  formatCardNumber(event: any) {
    const input = event.target.value.replace(/\D/g, '').substring(0, 16);
    const cardNumberFormatted = input
      .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
      .trim();
    this.form.patchValue({
      cardNumberControl: cardNumberFormatted,
    });
  }

  formatExpiryDate(event: any) {
    const input = event.target.value.replace(/\D/g, '').substring(0, 4);
    const expiryFormatted = input.replace(/(\d{2})(\d{0,2})/, '$1/$2').trim();
    this.form.patchValue({
      expiryDateControl: expiryFormatted,
    });
  }

  formatCVV(event: any) {
    const input = event.target.value.replace(/\D/g, '').substring(0, 3);
    const cvvFormatted = input.trim();
    this.form.patchValue({
      cvvControl: cvvFormatted,
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form is valid');
    } else {
      console.log('Form is not valid');
    }
  }
}
