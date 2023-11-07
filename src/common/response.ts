import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface ResponseData<T> {
  data: T;
}

@Injectable()
export class DataResponse<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<ResponseData<T>> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((value) => {
        return {
          data: value,
          status: 0,
          message: '请求成功',
          success: true,
        };
      }),
    );
  }
}
