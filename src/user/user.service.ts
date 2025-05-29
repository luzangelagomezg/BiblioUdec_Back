/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly bookRepository: Repository<UserEntity>
    ){}
    async create(user: UserEntity): Promise<UserEntity> {
        return this.bookRepository.save(user);
    }
    async findAll(): Promise<UserEntity[]> {
        return this.bookRepository.find();
    }
    async findOne(id: string): Promise<UserEntity> {
        const user = await this.bookRepository.findOneBy({ id });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
    async update(id: string, user: UserEntity): Promise<UserEntity> {
        await this.bookRepository.update(id, user);
        return this.findOne(id);
    }
    async remove(id: string): Promise<void> {
        await this.bookRepository.delete(id);
    }
}
