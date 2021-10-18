import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { AuthorsModule } from './authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeormConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    PostsModule,
    AuthorsModule,
    AuthModule,
  ],
})
export class AppModule {}
