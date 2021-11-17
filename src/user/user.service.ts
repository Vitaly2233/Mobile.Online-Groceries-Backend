import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto) {
    const { password } = dto;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    try {
      await this.userModel.create({ ...dto, password: hash });
    } catch (e) {
      throw new ConflictException('there is user with the email');
    }
  }

  async findOne(email: string, select?: string) {
    return await this.userModel.findOne({ email }, select);
  }
}
