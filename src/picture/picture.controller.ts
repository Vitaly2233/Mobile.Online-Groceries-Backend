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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UploadPictureDto } from './dto/upload-picture.dto';
import { PictureService } from './picture.service';

@Controller('picture')
@UseGuards(JwtAuthGuard)
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
  getOne(@Param('id') id, @Res() res) {
    return this.pictureService.getPicture(id, res);
  }
}
