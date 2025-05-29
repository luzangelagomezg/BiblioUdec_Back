import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEntity } from './delivery.entity/delivery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryEntity])], 
  providers: [DeliveryService],
  exports: [DeliveryService]
})
export class DeliveryModule {}
