import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 项目的入口文件
// 项目主函数
async function bootstrap() {
  //AppModule是主入口文件
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
