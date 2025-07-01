import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
