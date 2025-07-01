import { IsNotEmpty, IsString, IsNumber, IsInt, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
