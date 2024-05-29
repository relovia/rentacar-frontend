import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  CreateRentalRequest,
  GetAllRentalResponse,
  RentalControllerService,
} from '../../../../shared/services/api';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HomeLayoutComponent } from '../../../../shared/layouts/home-layout/home-layout.component';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HomeLayoutComponent,
  ],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.scss',
})
export class RentalComponent {
  rentals: GetAllRentalResponse[] = [];
  form!: FormGroup;
  formMessage: string | null = null;
  isSuccessful: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private rentalServices: RentalControllerService,
    private change: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRentals();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      carId: ['', [Validators.required]],
      rentStartDate: ['', [Validators.required]],
      rentEndDate: ['', [Validators.required]],
      renterName: ['', [Validators.required]],
    });
  }

  loadRentals() {
    this.rentalServices.getAllRentals().subscribe(
      (rentals: GetAllRentalResponse[]) => {
        console.log('Rentals response: ', rentals);
        this.rentals = rentals;
      },
      (error) => {
        console.error('Error loading rentals: ', error);
        this.isSuccessful = false;
        this.formMessage = error.errorMessage || 'Error loading rentals';
        this.change.markForCheck();
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      const createRequest: CreateRentalRequest = {
        carId: formData.carId,
        rentStartDate: formData.rentStartDate,
        rentEndDate: formData.rentEndDate,
        renterName: formData.renterName,
        isCancelled: false,
      };
      this.rentalServices
        .createRental({ createRentalRequest: createRequest })
        .subscribe(
          (response) => {
            console.log('Rental created successfully: ', response);
            this.loadRentals();
            this.form.reset();
          },
          (error) => {
            console.error('Error creating rental: ', error);
            this.isSuccessful = false;
            this.formMessage = 'Please fill all required fields';
            return;
          }
        );
    }
  }
}
