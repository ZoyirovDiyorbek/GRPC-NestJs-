import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneCategoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
