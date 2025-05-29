/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './book.dto/book.dto';
import { BookEntity } from './book.entity/book.entity';
import { plainToInstance } from 'class-transformer';
import { AuthorDto } from 'src/author/author.dto/author.dto';
import { AuthorEntity } from 'src/author/author.entity/author.entity';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    async findAll() {
        return this.bookService.findAll();
    }
    @Get(':id')
    async findOne(id: string) {
        return this.bookService.findOne(id);
    }

    @Post()
    async create(@Body() bookDto: BookDto) {
        const book: BookEntity = plainToInstance(BookEntity, bookDto);
        return this.bookService.create(book);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() bookDto: BookDto) {
        const book: BookEntity = plainToInstance(BookEntity, bookDto);
        return this.bookService.update(id, book);
    }

    @Put(':id/authors')
    async associateAuthorsBook(@Body() authorsDto: AuthorDto[], @Param('id') bookId: string) {
        const authors = plainToInstance(AuthorEntity, authorsDto);
        return await this.bookService.associateAuthorsToBook(bookId, authors);
    }

    @Put(':id/editorial/:editorialId')
    async addEditorialBook(@Param('id') bookId: string, @Param('editorialId') editorialId: string) {
        console.log(`Adding editorial ${editorialId} to book ${bookId}`);
        return this.bookService.addEditorialBook(bookId, editorialId);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return this.bookService.remove(id);
    }
}
