/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { EditorialModule } from './editorial/editorial.module';
import { AuthorModule } from './author/author.module';
import { LoanModule } from './loan/loan.module';
import { UserModule } from './user/user.module';
import { DeliveryModule } from './delivery/delivery.module';
import { RateModule } from './rate/rate.module';
import { BookEntity } from './book/book.entity/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorialEntity } from './editorial/editorial.entity/editorial.entity';
import { AuthorEntity } from './author/author.entity/author.entity';
import { LoanEntity } from './loan/loan.entity/loan.entity';
import { UserEntity } from './user/user.entity/user.entity';
import { DeliveryEntity } from './delivery/delivery.entity/delivery.entity';
import { RateEntity } from './rate/rate.entity/rate.entity';

@Module({
  imports: [BookModule, EditorialModule, AuthorModule, LoanModule, UserModule, DeliveryModule, RateModule,
     TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: '1234',
     database: 'library',
     entities: [BookEntity,EditorialEntity,AuthorEntity,LoanEntity,UserEntity,DeliveryEntity,RateEntity],
     dropSchema: false,
     synchronize: true
   }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
