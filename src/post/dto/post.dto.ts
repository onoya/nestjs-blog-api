import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiModelProperty()
  @IsString()
  readonly content: string;
}
