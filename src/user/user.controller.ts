import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
  path: 'user',
  version: '1', // 实际调用的时候以v开头。如：http://localhost:3000/v1/user
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/create1')
  create1(@Body() body) {
    /**
     * @Body('name') body
     * 如果这么写的话，拿到的body直接就是name的值了。算是快捷访问
     */
    return {
      code: 200,
      message: body.name,
    };
  }

  @Post('codeCheck')
  codeCheck(@Body() body, @Session() session) {
    console.log('====', body, session.code);
    // 通过apifox分别调用获取code及校验code两个接口，其session拿不到
    return {
      code: 200,
      message:
        session.code?.toLowerCase() === body?.code?.toLowerCase()
          ? '验证成功'
          : '验证失败',
    };
  }

  @Get()
  // @Version('1')//单个控制接口版本装饰器
  /**
   * @param query
   * @Query()是获取参数装饰器
   */
  findAll(@Query() query) {
    console.log(query); // 获取get请求的参数
    // return this.userService.findAll();
    return {
      code: 200,
      message: query.name, // 属性值是根据真实调用接口时传进来的。所以name不一定存在
    };
  }

  @Get('/code')
  createCode(@Req() req, @Res() res, @Session() session) {
    return this.userService.createCode(req, res, session);
  }

  /**
   * 动态路由方式
   * @param id
   */
  @Get('/finderOne/:id')
  findOne(@Param('id') id: string) {
    console.log('id', id);
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
