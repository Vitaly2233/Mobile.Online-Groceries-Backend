import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }
  
  @Get() 
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':type')
  getByType(@Param('type') type: string) {
    return this.productsService.getByType(type);
  }

  @Post('add_to_favorite/:productId')
  addToFavorite(@Param('productId') productId: string,  @Req() req: Request) {
    const userId = req.user._id;
    return this.productsService.addToFavorite(userId, productId);
  }

}

