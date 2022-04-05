import { IsNotEmpty, IsEmail, IsNumberString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;
}
