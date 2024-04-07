import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerListItemDto } from '../../models/customer-list-item-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../../../../shared/layouts/home-layout/home-layout.component';
import { TableDirective } from '../../../../shared/directives/table.directive';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  imports: [CommonModule, RouterModule, HomeLayoutComponent, TableDirective],
})
export class CustomerListComponent implements OnInit {
  customers: CustomerListItemDto[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }
}
