import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/*
 * 简单类比vue里面的路由页面
 * 常见功能是用来处理http请求以及调用service层的处理方法
 * */
@Controller()
export class AppController {
  /*
   * 依赖注入
   * private--私有的
   * readonly--只读的
   * appService--无需实例化
   */
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
