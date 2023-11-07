import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { NextFunction, Request, Response } from 'express';
// 项目的入口文件
// 项目主函数
/**
 * 全局中间件，注意：全局中间件只能函数形式，不能类形式
 * @constructor
 */
const blackList = ['/list'];

function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  console.log('!!!这里是全局中间件!!!', req.originalUrl);
  if (blackList.includes(req.originalUrl)) {
    res.send('被全局中间件拦截！！！');
  } else {
    next();
  }
}

async function bootstrap() {
  //AppModule是主入口文件
  const app = await NestFactory.create(AppModule);
  // 打开版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // 注册全局中间件
  app.use(MiddleWareAll);

  app.use(
    session({
      secret: 'nestjsDemo',
      rolling: true,
      name: 'chunYang.sid',
      cookie: { maxAge: 999 },
    }),
  );
  await app.listen(3000);
}

bootstrap();
