/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanEntity } from './loan.entity/loan.entity';
import { LoanController } from './loan.controller';
import { UserEntity } from 'src/user/user.entity/user.entity';
import { DeliveryEntity } from 'src/delivery/delivery.entity/delivery.entity';
import { RateEntity } from 'src/rate/rate.entity/rate.entity';
import { BookEntity } from 'src/book/book.entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity, UserEntity, DeliveryEntity, RateEntity, BookEntity])],
  providers: [LoanService],
  exports: [LoanService],
  controllers: [LoanController]
})
export class LoanModule {}
