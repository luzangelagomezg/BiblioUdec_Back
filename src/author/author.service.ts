import { Injectable } from '@nestjs/common';
import { AuthorEntity } from './author.entity/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
     constructor(
       @InjectRepository(AuthorEntity)
       private readonly authorRepository: Repository<AuthorEntity>
   ){}

    async create(author: AuthorEntity): Promise<AuthorEntity> {
         return this.authorRepository.save(author);
    }
    async findAll(): Promise<AuthorEntity[]> {
         return this.authorRepository.find();
    }
    async findOne(id: string): Promise<AuthorEntity> {
         const author = await this.authorRepository.findOneBy({ id });
         if (!author) {
             throw new Error(`Author with id ${id} not found`);
         }
         return author;
    }

    async update(id: string, author: AuthorEntity): Promise<AuthorEntity> {
         await this.authorRepository.update(id, author);
         return this.findOne(id);
    }
    async remove(id: string): Promise<void> {
         await this.authorRepository.delete(id);
    }
}
