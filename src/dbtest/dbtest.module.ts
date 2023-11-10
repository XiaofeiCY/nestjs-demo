import { Module } from '@nestjs/common';
import { DbtestService } from './dbtest.service';
import { DbtestController } from './dbtest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dbtest } from './entities/dbtest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dbtest])], // 关联数据库
  controllers: [DbtestController],
  providers: [DbtestService],
})
export class DbtestModule {}
