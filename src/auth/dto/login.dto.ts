import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;
}
