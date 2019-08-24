import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailTaken } from '../../custom.validation';

export class RegisterDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailTaken()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
