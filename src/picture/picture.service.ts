import { ConflictException, Injectable } from '@nestjs/common';
import {
  createReadStream,
  existsSync,
  mkdirSync,
  readFileSync,
  write,
  writeFileSync,
} from 'fs';
import { UploadPictureDto } from './dto/upload-picture.dto';
import { ComputeFilePath } from './util/compute-file-path.util';

@Injectable()
export class PictureService {
  save(dto: UploadPictureDto, buffer) {
    const { id } = dto;
    const path = ComputeFilePath(id);

    if (existsSync(path))
      throw new ConflictException('file with the name alreay exists');

    writeFileSync(path, buffer);
  }

  getPicture(id: string) {
    const file = `${__dirname}/../../upload/${id}.png`;

    return readFileSync(file, { encoding: 'base64' });
  }
}
