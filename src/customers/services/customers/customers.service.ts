import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'soccer@mail.com',
      name: 'Dan Dini',
    },
    {
      id: 2,
      email: 'pizza@mail.com',
      name: 'Carl Pozzi',
    },
    {
      id: 3,
      email: 'hot@mail.com',
      name: 'Tom Kenior',
    },
  ];

  getCustomers() {
    return this.customers;
  }

  findCustomerById(id: number) {
    return this.customers.find((customer) => customer.id === id);
  }
  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }
}
