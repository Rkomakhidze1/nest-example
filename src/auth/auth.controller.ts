/* eslint-disable prettier/prettier */
import { Post, Controller, UseGuards, Request, Body } from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authorsService: AuthorsService,
  ) {}

  @Post('signup')
  async signup(@Body() createAuthorDto: CreateAuthorDto) {
    const author = await this.authorsService.create(createAuthorDto);
    return author;
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() req) {
    return this.authService.login(req.user);
  }
}
