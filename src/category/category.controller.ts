import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCatedotyDto } from './dto/create-category.dto';

@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() dto: CreateCatedotyDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  getAll() {
    return this.categoryService.findAll();
  }
}
