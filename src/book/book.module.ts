/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookEntity } from './book.entity/book.entity';
import { BookController } from './book.controller';
import { AuthorEntity } from 'src/author/author.entity/author.entity';
import { EditorialEntity } from 'src/editorial/editorial.entity/editorial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity, EditorialEntity])],
  providers: [BookService],
  exports: [BookService],
  controllers: [BookController]
})
export class BookModule {}
