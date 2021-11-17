import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/common/interface/jwt-payload.interface';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { UserWIthoutPassword } from './type/user-without-password.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWIthoutPassword> {
    const user = await this.userService.findOne(email);
    const userParsed = user.toJSON<User>();
    const isMatch = await bcrypt.compare(password, userParsed.password);
    if (userParsed && isMatch) {
      delete userParsed.password;
      return userParsed as UserWIthoutPassword;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload: JwtPayload = { email: user.email, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
