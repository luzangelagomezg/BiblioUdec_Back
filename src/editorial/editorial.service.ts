import { Injectable } from '@nestjs/common';
import { EditorialEntity } from './editorial.entity/editorial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EditorialService {
    constructor(
       @InjectRepository(EditorialEntity)
       private readonly editorialRepository: Repository<EditorialEntity>
   ){}
    async create(editorial: EditorialEntity): Promise<EditorialEntity> {
        return this.editorialRepository.save(editorial);
    }

    async findAll(): Promise<EditorialEntity[]> {
        return this.editorialRepository.find();
    }

    async findOne(id: string): Promise<EditorialEntity> {
        const editorial = await this.editorialRepository.findOneBy({ id });
        if (!editorial) {
            throw new Error(`Editorial with id ${id} not found`);
        }
        return editorial;
    }

    async update(id: string, editorial: EditorialEntity): Promise<EditorialEntity> {
        await this.editorialRepository.update(id, editorial);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.editorialRepository.delete(id);
    }
}
