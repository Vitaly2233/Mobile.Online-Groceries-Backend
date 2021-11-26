import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from 'src/common/config';
import { JwtPayload } from 'src/common/interface/jwt-payload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: config.JWT.IGNORE_EXPIRATION,
      secretOrKey: config.JWT.SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.email);
    if (!user) return null;
    return user;
  }
}
