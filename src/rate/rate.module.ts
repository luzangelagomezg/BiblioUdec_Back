/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateEntity } from './rate.entity/rate.entity';
import { RateController } from './rate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RateEntity])],
  providers: [RateService],
  exports: [RateService],
  controllers: [RateController]
})
export class RateModule {}
