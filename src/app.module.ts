import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';

/*
 * 类装饰器
 * 根模块用于处理其他类的引用与共享
 * */
@Module({
  imports: [DemoModule, UserModule, ListModule, UploadModule, LoginModule, GuardModule],
  controllers: [AppController, DemoController],
  providers: [AppService],
})
export class AppModule {}
