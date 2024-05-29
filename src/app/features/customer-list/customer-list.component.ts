import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../../shared/layouts/home-layout/home-layout.component';
import { TableDirective } from '../../shared/directives/table.directive';
import {
  GetAllUserResponse,
  UserControllerService,
} from '../../shared/services/api';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  imports: [CommonModule, RouterModule, HomeLayoutComponent, TableDirective],
})
export class CustomerListComponent implements OnInit {
  customers: GetAllUserResponse[] = [];

  constructor(
    private userServices: UserControllerService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.userServices.getAllUsers().subscribe((users) => {
      this.customers = users;
      this.change.markForCheck();
    });
  }
}
