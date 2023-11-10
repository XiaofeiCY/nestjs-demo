import { Module } from '@nestjs/common';
import { DbtestService } from './dbtest.service';
import { DbtestController } from './dbtest.controller';

@Module({
  controllers: [DbtestController],
  providers: [DbtestService],
})
export class DbtestModule {}
