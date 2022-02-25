import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  findCustomer() {
    return { id: 1, email: 'soccer@mail.com', createdAt: new Date() };
  }
}
