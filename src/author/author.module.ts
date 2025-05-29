import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './author.entity/author.entity';
import { AuthorController } from './author.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  providers: [AuthorService],
  exports: [AuthorService],
  controllers: [AuthorController]
})
export class AuthorModule {}
