import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CreditCardControllerService,
  GetAllCreditCardResponse,
  GetAllModelResponse,
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

  constructor(
    private creditCardServices: CreditCardControllerService,
    private change: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getAllCreditCards(this.creditCard!);
    console.log(this.creditCard);
    this.change.markForCheck();
  }

  getAllCreditCards(creditCard: GetAllCreditCardResponse): void {
    this.creditCardServices.getAllCreditCards().subscribe((creditCards) => {
      this.creditCards = creditCards;
      this.change.markForCheck();
    });
  }
}
