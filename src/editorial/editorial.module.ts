import { Module } from '@nestjs/common';
import { EditorialService } from './editorial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorialEntity } from './editorial.entity/editorial.entity';
import { EditorialController } from './editorial.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EditorialEntity])],
  providers: [EditorialService],
  exports: [EditorialService],
  controllers: [EditorialController]
})
export class EditorialModule {}
