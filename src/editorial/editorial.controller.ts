/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { EditorialDto } from './editorial.dto/editorial.dto';
import { EditorialService } from './editorial.service';
import { EditorialEntity } from './editorial.entity/editorial.entity';
import { plainToInstance } from 'class-transformer';

@Controller('editorials')
export class EditorialController {
    constructor(private readonly editorialService: EditorialService) {}

    @Get()
    async findAll() {
        return this.editorialService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.editorialService.findOne(id);
    }

    @Post()
    async create(@Body() editorialDto: EditorialDto) {
        const editorial: EditorialEntity = plainToInstance(EditorialEntity, editorialDto);
        return this.editorialService.create(editorial);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() editorialDto: EditorialDto) {
        const editorial: EditorialEntity = plainToInstance(EditorialEntity, editorialDto);
        return this.editorialService.update(id, editorial);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return this.editorialService.remove(id);
    }
}
