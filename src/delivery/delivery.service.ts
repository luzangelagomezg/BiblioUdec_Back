import { Injectable } from '@nestjs/common';
import { DeliveryEntity } from './delivery.entity/delivery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryService {
    constructor(
       @InjectRepository(DeliveryEntity)
       private readonly deliveryRepository: Repository<DeliveryEntity>
   ){}
    async create(delivery: DeliveryEntity): Promise<DeliveryEntity> {
        return this.deliveryRepository.save(delivery);
    }

    async findAll(): Promise<DeliveryEntity[]> {
        return this.deliveryRepository.find();
    }

    async findOne(id: string): Promise<DeliveryEntity> {
        const delivery = await this.deliveryRepository.findOneBy({ id });
        if (!delivery) {
            throw new Error(`Delivery with id ${id} not found`);
        }
        return delivery;
    }

    async update(id: string, delivery: DeliveryEntity): Promise<DeliveryEntity> {
        await this.deliveryRepository.update(id, delivery);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.deliveryRepository.delete(id);
    }
}
