import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';

/*
 * 类装饰器
 * 根模块用于处理其他类的引用与共享
 * */
@Module({
  imports: [],
  controllers: [AppController, DemoController],
  providers: [AppService],
})
export class AppModule {}
