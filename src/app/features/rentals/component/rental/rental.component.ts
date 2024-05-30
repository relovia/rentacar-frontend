import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  CarControllerService,
  CreateRentalRequestParams,
  GetAllCarResponse,
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
  cars: GetAllCarResponse[] = [];
  form!: FormGroup;
  formMessage: string | null = null;
  isSuccessful: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private rentalServices: RentalControllerService,
    private carsServices: CarControllerService,
    private change: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formMessage = null;
  }

  ngOnInit() {
    this.loadRentals();
    this.createForm();

    this.route.queryParams.subscribe((params) => {
      const prefilledCarId = params['prefilledCarId'];

      if (prefilledCarId) {
        this.form.patchValue({ carId: prefilledCarId });
        this.getCarDetails(prefilledCarId);
      }
    });
  }

  getCarDetails(carId: number) {
    this.carsServices.getCarById({ id: carId }).subscribe((car) => {
      const carDetails = `Model Name: ${car.modelName}, Plate: ${car.plate}, Daily Price: ${car.dailyPrice}₺`;
      console.log('Car Details:', carDetails);

      // Formu yalnızca belirli bir araç id'sini alıyor
      this.form.patchValue({
        carId: carId,
        modelId: car.modelId,
        modelName: car.modelName,
        plate: car.plate,
        dailyPrice: car.dailyPrice,
      });
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      carId: ['', Validators.required],
      rentStartDate: ['', Validators.required],
      rentEndDate: ['', Validators.required],
      renterName: ['', Validators.required],
    });
  }

  loadRentals() {
    this.rentalServices.getAllRentals().subscribe({
      next: (response) => {
        this.rentals = response;
        this.isSuccessful = true;
        this.formMessage = 'Rentals loaded';
        this.change.markForCheck();
      },
      error: (error) => {
        console.log('Rentals error: ', error);
        this.isSuccessful = false;
        this.formMessage = error.errorMessage || 'Rentals failed';
        this.change.markForCheck();
      },
    });
  }

  createRental() {
    if (this.form.invalid) {
      this.isSuccessful = false;
      this.formMessage = 'Please fill all required fields';
      return;
    }

    const request: CreateRentalRequestParams = {
      createRentalRequest: {
        carId: this.form.value.carId,
        rentStartDate: this.form.value.rentStartDate,
        rentEndDate: this.form.value.rentEndDate,
        renterName: this.form.value.renterName,
        isCancelled: false,
      },
    };

    this.rentalServices.createRental(request).subscribe({
      next: (response) => {
        console.log('Rental created:', response);
        this.isSuccessful = true;
        this.formMessage = 'Rental created successfully';
        this.change.markForCheck();
        this.form.reset();

        // Rental oluşturulduktan sonra current rentals listesi yenilenir
        this.loadRentals();

        // Kiralanan aracın durumunu güncelle
        const rentedCarId = request.createRentalRequest.carId;
        const rentedCar = this.cars.find((car) => car.id === rentedCarId);

        if (rentedCar) {
          console.log("Rented car's state: ", rentedCar.state);
          rentedCar.state = 2;
          const dailyPrice = rentedCar.dailyPrice || 0;

          // Aracın durumunu güncellemek için bir servis çağrısı yapılıyor
          this.carsServices
            .updateCar({
              updateCarRequest: {
                id: rentedCarId,
                state: 2,
                plate: rentedCar.plate!,
                dailyPrice: dailyPrice,
              },
            })
            .subscribe((car) => {
              console.log('Car updated:', car);
              this.change.markForCheck();
            });
        }
      },
      error: (error) => {
        console.log('Error creating rental:', error);
        this.isSuccessful = false;
        this.formMessage = error.errorMessage || 'Failed to create rental';
        this.change.markForCheck();
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.isSuccessful = false;
      this.formMessage = 'Please fill all required fields';
      return;
    }
    this.createRental();
  }
}
