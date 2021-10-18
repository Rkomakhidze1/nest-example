/* eslint-disable prettier/prettier */
import {
  Post,
  Controller,
  UseGuards,
  Body,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { GetAuthor } from 'src/decorators/get-author.decorator';
import { Author } from 'src/authors/author.entity';
import { Cache } from 'cache-manager';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authorsService: AuthorsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('signup')
  async signup(@Body() createAuthorDto: CreateAuthorDto) {
    const author = await this.authorsService.create(createAuthorDto);
    return author;
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@GetAuthor() author: Author) {
    return this.authService.login(author);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async logout(@GetAuthor() author: Author) {
    const token = await this.cacheManager.get<string>(author.tokenId);
    console.log(token);
    // return this.logout(author);
  }
}
