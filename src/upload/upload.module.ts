import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Request } from 'express';

@Module({
  // 注册上传模块
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../image'),
        filename(
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          /**
           * 文件重命名，防止上传文件的名称过长、乱码等问题导致存储异常
           * extname(file.originalname)
           * 作用是获取到文件的后缀格式，png、jpg等等
           */
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
