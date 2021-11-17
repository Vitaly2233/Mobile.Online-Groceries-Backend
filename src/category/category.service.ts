import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatedotyDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(dto: CreateCatedotyDto) {
    try {
      const category = await this.categoryModel.create(dto);
      return category;
    } catch (e) {
      throw new ConflictException('there is a category with the name');
    }
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  async findAll() {
    return await this.categoryModel.find({});
  }
}
