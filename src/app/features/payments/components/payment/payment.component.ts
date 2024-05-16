import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  GetAllCreditCardResponse,
  GetAllModelResponse,
  GetAllRentalResponse,
  RentalControllerService,
} from '../../../../shared/services/api';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  @Input() creditCard: GetAllCreditCardResponse | null = null;

  creditCards: GetAllCreditCardResponse[] = [];
  models: GetAllModelResponse[] = [];
  ngOnInit(): void {
    if (this.creditCard) {
      this.getCreditCardNumber(this.creditCard);
      console.log(this.creditCard.cardNumber);
    }
  }

  getCreditCardNumber(creditCard: GetAllCreditCardResponse) {
    this.models.find((model) => model.id === creditCard.id);
    console.log(creditCard.cardNumber);
  }
}
