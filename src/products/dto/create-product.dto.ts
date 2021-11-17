import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  price: string;

  @IsString()
  type: string

  @IsString()
  @IsOptional()
  characteristics: string;

  @IsString()
  @IsOptional()
  details: string;

  @IsMongoId()
  category: string;
}
