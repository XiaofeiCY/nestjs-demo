import { Module } from '@nestjs/common';
import { ManageService } from './manage.service';
import { ManageController } from './manage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manage } from './entities/manage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manage])],
  controllers: [ManageController],
  providers: [ManageService],
})
export class ManageModule {}
