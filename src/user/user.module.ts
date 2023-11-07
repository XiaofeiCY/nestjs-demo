import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from '../middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // eq:字符串路由拦截格式
    // consumer.apply(Logger).forRoutes('v1/user');
    // eq:对象拦截格式
    consumer.apply(Logger).forRoutes({
      path: 'v1/user/create1',
      method: RequestMethod.POST,
    });
    // wq：全部请求拦截格式
    // consumer.apply(Logger).forRoutes(UserController);
  }
}
