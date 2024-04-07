import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomerListItemDto } from '../models/customer-list-item-dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor() {}

  getAllCustomers(): Observable<CustomerListItemDto[]> {
    const fakeCustomers: CustomerListItemDto[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', companyName: 'ABC Inc.' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', companyName: 'XYZ Corp.' },
      {
        id: 3,
        firstName: 'Alice',
        lastName: 'Johnson',
        companyName: 'ACME Ltd.',
      },
      {
        id: 4,
        firstName: 'Bob',
        lastName: 'Brown',
        companyName: 'Brown Enterprises',
      },
      {
        id: 5,
        firstName: 'Emma',
        lastName: 'Garcia',
        companyName: 'Garcia Co.',
      },
      {
        id: 6,
        firstName: 'Michael',
        lastName: 'Lee',
        companyName: 'Lee Group',
      },
      {
        id: 7,
        firstName: 'Olivia',
        lastName: 'Martinez',
        companyName: 'Martinez Holdings',
      },
      {
        id: 8,
        firstName: 'William',
        lastName: 'Taylor',
        companyName: 'Taylor Industries',
      },
      {
        id: 9,
        firstName: 'Sophia',
        lastName: 'Clark',
        companyName: 'Clark Enterprises',
      },
      {
        id: 10,
        firstName: 'Liam',
        lastName: 'Lewis',
        companyName: 'Lewis Corporation',
      },
    ];
    return of(fakeCustomers);
  }
}
