import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

/**
 * 局部中间件
 */
@Injectable()
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('我来了===');

    /** 执行拦截
     * 这里可以做一些白名单操作等等
     */
    // res.send('我被拦截了');

    // 执行继续
    next();
  }
}
