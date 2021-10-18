/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthorsService } from 'src/authors/authors.service';
import { jwtConstants } from '../constants';
import { JwtInterface } from '../jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authorService: AuthorsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtInterface) {
    console.log('jerrrrrrreee+++++++++++++++++');
    const { userId } = payload;
    const author = await this.authorService.findOne(userId as number);
    return author;
  }
}
