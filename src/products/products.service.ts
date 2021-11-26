import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto) {
    try {
      const category = await this.categoryService.findOne(dto.category);
      if (!category)
        throw new NotFoundException('there is no ctegory with the id');
      const product = await this.productModel.create(dto);
      return product;
    } catch (e) {
      throw new ConflictException('There is a product with the name');
    }
  }

  getAll() {
    return this.productModel.find({});
  }

  getByType(type: string) {
    return this.productModel.find({ type });
  }

  async addToFavorite(userId, productId) {
    return await this.userService.addToFavorite(userId, productId);
  }
}
