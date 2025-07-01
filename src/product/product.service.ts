import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductRequest, UpdateProductRequest } from '../proto/shop';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(data: CreateProductRequest): Promise<Product> {
    const category = await this.categoryService.findOne(data.categoryId);
    if (!category) throw new BadRequestException('Category not found');

    const product = this.productRepository.create({ ...data, category });
    return this.productRepository.save(product);
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  async update(id: string, data: UpdateProductRequest): Promise<Product> {
    const product = await this.findOne(id);
    if (data.categoryId && product.categoryId !== data.categoryId) {
      const newCategory = await this.categoryService.findOne(data.categoryId);
      if (!newCategory) throw new BadRequestException('New Category not found');
      product.category = newCategory;
    }
    this.productRepository.merge(product, data);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Product not found');
  }
}
