import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
// 项目的入口文件
// 项目主函数
async function bootstrap() {
  //AppModule是主入口文件
  const app = await NestFactory.create(AppModule);
  // 打开版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });

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
