import { IsString, IsNotEmpty } from 'class-validator'

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly content: string;
}
