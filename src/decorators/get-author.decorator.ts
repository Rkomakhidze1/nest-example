/* eslint-disable prettier/prettier */
import { createParamDecorator } from '@nestjs/common';
import { Author } from '../authors/author.entity';

export const GetAuthor = createParamDecorator(
  (data, ctx): Author => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
