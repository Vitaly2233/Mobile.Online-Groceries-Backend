import { IsMongoId, IsString } from 'class-validator';

export class UploadPictureDto {
  @IsMongoId()
  id: string;
}
