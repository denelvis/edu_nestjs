import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './../../dtos/CreatePayment.dto';

@Injectable()
export class PaymentsService {
  private users = [
    {
      email: 'example@example.com',
    },
    {
      email: 'exam@example.com',
    },
    {
      email: 'mple@example.com',
    },
  ];

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { email } = createPaymentDto;
    const user = this.users.find((user) => user.email === email);
    if (user) {
      return {
        id: 1,
        status: 'success',
      };
    } else {
      throw new BadRequestException();
    }
  }
}
