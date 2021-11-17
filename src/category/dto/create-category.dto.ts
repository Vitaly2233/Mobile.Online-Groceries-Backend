import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateCatedotyDto {
  @IsString()
  name: string;
}
