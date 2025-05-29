/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateEntity } from './rate.entity/rate.entity';
import { RateDto } from './rate.dto/rate.dto';
import { plainToInstance } from 'class-transformer';

@Controller('rates')
export class RateController {

    constructor(private readonly rateService: RateService) {}

    @Get()
    async findAll() {
        return this.rateService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.rateService.findOne(id);
    }
    @Post()
    async create(@Body() rateDto: RateDto) {
        const rate: RateEntity = plainToInstance(RateEntity, rateDto);
        return this.rateService.create(rate);
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() rateDto: RateDto) {
        const rate: RateEntity = plainToInstance(RateEntity, rateDto);
        return this.rateService.update(id, rate);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return this.rateService.remove(id);
    }
    
}
