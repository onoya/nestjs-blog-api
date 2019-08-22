import { IsNotEmpty, IsEmail } from 'class-validator';
import { User } from '../../user/user.entity';

export class RegisterDto extends User {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
