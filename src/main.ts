import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { NextFunction, Request, Response } from 'express';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DataResponse } from './common/response';
import { HttpFilter } from './common/filter';

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
    res.send({
      message: '被全局中间件拦截！！！',
    });
  } else {
    next();
  }
}

async function bootstrap() {
  /**
   *   AppModule是主入口文件
   *   通过添加NestExpressApplication类型，帮助app实例导出useStaticAssets方法
   *   通过useStaticAssets读取上传成功后的静态资源文件
   *   具体使用方法：
   *   图片名称在dist/image文件夹里面找
   *   地址栏输入：http://localhost:3000/chunyang/1699327606820.png
   */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'image'), {
    prefix: '/chunyang', // 配置路径前缀
  });
  /**
   * 注册跨域函数
   * 测试方式：
   * 打开一个浏览器控制台，输入：fetch('http://localhost:3000/list').then(res=>res.json()).then(res=>{console.log(res)})
   * 就可以看到执行结果
   */
  app.use(cors());
  // 打开版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // 注册全局中间件
  app.use(MiddleWareAll);

  // 注册全局响应拦截器,作用是帮助接口返回值统一格式
  app.useGlobalInterceptors(new DataResponse());

  // 注册全局异常拦截器，作用是帮助接口统一返回异常报错信息
  app.useGlobalFilters(new HttpFilter());

  // 注册全局校验DTO--注意：错误提示信息展示会受到上面异常拦截器的影响从而展示不够详细。注释掉上面的异常拦截器就可以看到详细报错，或者优化当前DTO报错返回格式也行
  app.useGlobalPipes(new ValidationPipe());

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
