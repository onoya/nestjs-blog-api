import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailTaken } from '../../custom.validation';
import { User } from '../../user/user.entity';

export class RegisterDto extends User {
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
