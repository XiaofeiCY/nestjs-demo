import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbtestModule } from './dbtest/dbtest.module';
import { ManageModule } from './manage/manage.module';

/*
 * 类装饰器
 * 根模块用于处理其他类的引用与共享
 * */
@Module({
  imports: [
    DemoModule,
    UserModule,
    ListModule,
    UploadModule,
    LoginModule,
    GuardModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      username: 'root', // 账号
      password: '123456', // 密码
      host: 'localhost', // host
      charset: 'utf8mb4', // or the appropriate character set
      // collation: 'utf8mb4_unicode_ci', // or the appropriate collation
      port: 3306, // 端口号
      database: 'nestjsDB', // 库名
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
      // 注意：实体同步后会导致数据丢失，实操后发现中文数据经常会丢失，所以建议同步完关掉属性
      // synchronize: true, // synchronize是否自动将实体类同步到数据库，建议生产环境不要用，开发环境无所谓了，因为很耗内存，保存一次执行一次同步
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 重试连接数据库次数
      // 注意：实体同步后会导致数据丢失，实操后发现中文数据经常会丢失，所以建议同步完关掉属性
      // autoLoadEntities: true, // 如果为true将自动加载实体forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中。
    }),
    DbtestModule,
    ManageModule,
  ],
  controllers: [AppController, DemoController],
  providers: [AppService],
})
export class AppModule {}
