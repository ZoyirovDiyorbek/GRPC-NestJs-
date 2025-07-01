import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { Category, Categories, Empty } from '../proto/shop';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindOneCategoryDto } from './dto/find-one-category.dto';

@Controller('category')
@UsePipes(new ValidationPipe({ transform: true }))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @GrpcMethod('CategoryService', 'CreateCategory')
  async createCategory(data: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(data);
  }

  @GrpcMethod('CategoryService', 'FindOneCategory')
  async findOneCategory(data: FindOneCategoryDto): Promise<Category> {
    return this.categoryService.findOne(data.id);
  }

  @GrpcMethod('CategoryService', 'FindAllCategories')
  async findAllCategories(): Promise<Categories> {
    const categories = await this.categoryService.findAll();
    return { categories };
  }

  @GrpcMethod('CategoryService', 'UpdateCategory')
  async updateCategory(data: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.update(data.id, data);
  }

  @GrpcMethod('CategoryService', 'DeleteCategory')
  async deleteCategory(data: FindOneCategoryDto): Promise<Empty> {
    await this.categoryService.remove(data.id);
    return {};
  }
}
