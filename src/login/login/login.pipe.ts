import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // console.log('====', value, metadata);
    const DTO = plainToInstance(metadata.metatype, value); //实例化metadata.metatype，并映射到value上
    const err = await validate(DTO);
    if (err.length) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
