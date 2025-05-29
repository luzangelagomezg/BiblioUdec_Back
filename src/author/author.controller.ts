/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorEntity } from './author.entity/author.entity';
import { plainToInstance } from 'class-transformer';
import { AuthorDto } from './author.dto/author.dto';

@Controller('authors')
export class AuthorController {

    constructor(private readonly authorService: AuthorService) {}

    @Get()
    async findAll() {
        return this.authorService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.authorService.findOne(id);
    }

    @Post()
    async create(@Body() authorDto: AuthorDto) {
        const author: AuthorEntity = plainToInstance(AuthorEntity, authorDto);
        return this.authorService.create(author);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() authorDto: AuthorDto) {
        const author: AuthorEntity = plainToInstance(AuthorEntity, authorDto);
        return this.authorService.update(id, author);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return this.authorService.remove(id);
    }
}
