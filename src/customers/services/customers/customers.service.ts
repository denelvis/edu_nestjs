import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  private users = [
    {
      id: 1,
      email: 'soccer@mail.com',
      createdAt: new Date(),
    },
    {
      id: 2,
      email: 'pizza@mail.com',
      createdAt: new Date(),
    },
    {
      id: 3,
      email: 'hot@mail.com',
      createdAt: new Date(),
    },
  ];

  findCustomerById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
