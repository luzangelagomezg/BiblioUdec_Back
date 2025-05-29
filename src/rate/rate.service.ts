import { Injectable } from '@nestjs/common';
import { RateEntity } from './rate.entity/rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RateService {
    constructor(
       @InjectRepository(RateEntity)
       private readonly rateRepository: Repository<RateEntity>
   ){}
    async create(rate: RateEntity): Promise<RateEntity> {
        return this.rateRepository.save(rate);
    }

    async findAll(): Promise<RateEntity[]> {
        return this.rateRepository.find();
    }

    async findOne(id: string): Promise<RateEntity> {
        const rate = await this.rateRepository.findOneBy({ id });
        if (!rate) {
            throw new Error(`Rate with id ${id} not found`);
        }
        return rate;
    }

    async update(id: string, rate: RateEntity): Promise<RateEntity> {
        await this.rateRepository.update(id, rate);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.rateRepository.delete(id);
    }
}
