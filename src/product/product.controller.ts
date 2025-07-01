import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { Product, Products, Empty } from '../proto/shop';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindOneProductDto } from './dto/find-one-product.dto';

@Controller('product')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProduct(data: CreateProductDto): Promise<Product> {
    return this.productService.create(data);
  }

  @GrpcMethod('ProductService', 'FindOneProduct')
  async findOneProduct(data: FindOneProductDto): Promise<Product> {
    return this.productService.findOne(data.id);
  }

  @GrpcMethod('ProductService', 'FindAllProducts')
  async findAllProducts(): Promise<Products> {
    const products = await this.productService.findAll();
    return { products };
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  async updateProduct(data: UpdateProductDto): Promise<Product> {
    return this.productService.update(data.id, data);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  async deleteProduct(data: FindOneProductDto): Promise<Empty> {
    await this.productService.remove(data.id);
    return {};
  }
}
