import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/products/schema/product.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: Product[] | mongoose.Schema.Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
