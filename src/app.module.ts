import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { PictureModule } from './picture/picture.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/MobileOnlineGroceries'),
    AuthModule,
    UserModule,
    ProductsModule,
    CategoryModule,
    PictureModule,
  ],
})
export class AppModule {}
