/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto/user.dto';
import { UserEntity } from './user.entity/user.entity';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(id: string) {
        return this.userService.findOne(id);
    }

    @Post()
    async create(@Body() UserDto: UserDto) {
        const user: UserEntity = plainToInstance(UserEntity, UserDto);
        return this.userService.create(user);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() UserDto: UserDto) {
        const user: UserEntity = plainToInstance(UserEntity, UserDto);
        return this.userService.update(id, user);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
