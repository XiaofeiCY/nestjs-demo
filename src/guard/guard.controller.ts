import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role/role.guard';
import { Role } from './role/role.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('guard')
@UseGuards(RoleGuard)
@ApiTags('守卫功能接口') //swagger接口分组
@ApiBearerAuth() //swagger携带token，使用前需要在main.ts内全局注册addBearerAuth
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  // @SetMetadata('roleList', ['admin', 'admin1'])
  @Role('admin', 'admin1')
  @ApiOperation({ summary: 'Get接口', description: '获取全部guard数据' }) // swagger接口描述
  @ApiQuery({
    name: 'page',
    description: '分页信息',
  }) //swagger参数描述
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: '当借口报错403时的相关解释',
  }) // swagger接口返回数据的描述
  @ApiResponse({
    status: HttpStatus.PERMANENT_REDIRECT,
    description: '当借口报错308时的相关解释',
  }) // swagger接口返回数据的描述
  findAll() {
    return this.guardService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '这个接口要传id',
    required: true,
    type: 'number',
  }) // swagger参数描述
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
