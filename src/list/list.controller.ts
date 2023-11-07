import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import * as uuid from 'uuid';

console.log('uuid', uuid.v4());

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Get()
  findAll() {
    return this.listService.findAll();
  }

  /**
   * 通过ParseIntPipe将id类型转为int类型
   * @param id
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('===========', typeof id);
    return this.listService.findOne(id);
  }

  /**
   * 通过ParseUUIDPipe判断传入参数类型为uuid，校验不通过的时候接口报错
   * @param id
   */
  @Get('/uuid/:id')
  getUuid(@Param('id', ParseUUIDPipe) id: number) {
    console.log('===========', typeof id);
    return this.listService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
