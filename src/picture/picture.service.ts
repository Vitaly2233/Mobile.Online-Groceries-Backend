import { ConflictException, Injectable } from '@nestjs/common';
import {
  createReadStream,
  existsSync,
  mkdirSync,
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

  getPicture(id: string, res) {
    const file = `${__dirname}/../../upload/${id}.png`;
    var filestream = createReadStream(file);
    filestream.pipe(res);
  }
}
