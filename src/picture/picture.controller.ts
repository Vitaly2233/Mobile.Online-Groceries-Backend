import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UploadPictureDto } from './dto/upload-picture.dto';
import { PictureService } from './picture.service';

@Controller('picture')
export class PictureController {
  constructor(private pictureService: PictureService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('picture'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadPictureDto,
  ) {
    return this.pictureService.save(dto, file.buffer);
  }

  @Get(':id')
  getOne(@Param('id') id) {
    const picture = this.pictureService.getPicture(id);
    return picture;
  }
}
