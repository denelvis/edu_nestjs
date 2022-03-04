import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
