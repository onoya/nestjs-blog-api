import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailTaken } from '../../custom.validation';

export class RegisterDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsEmailTaken()
  readonly email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;
}
