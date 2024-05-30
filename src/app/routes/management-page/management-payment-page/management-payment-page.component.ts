import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from '../../../features/payments/components/payment/payment.component';

@Component({
  selector: 'app-management-payment-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule, PaymentComponent],
  templateUrl: './management-payment-page.component.html',
  styleUrl: './management-payment-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementPaymentPageComponent {
  constructor() {}
}
