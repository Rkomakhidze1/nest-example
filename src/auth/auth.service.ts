/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Author } from 'src/authors/author.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const author = await this.authorRepository.findOne({ where: { username } });
    if (author && author.password === pass) {
      const { password, ...result } = author;
      password;
      return result;
    }
    return null;
  }

  async login(author: Author) {
    const tokenId = uuid();
    author.tokenId = tokenId;
    await this.authorRepository.save(author);
    const payload = { userId: author.id, tokenId };
    const token = this.jwtService.sign(payload);
    await this.cacheManager.set(tokenId, token, { ttl: 1000 * 60 * 60 * 2 });
    return {
      access_token: token,
    };
  }

  async logout(author: Author): Promise<void> {
    return;
  }
}
