import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DbtestService } from './dbtest.service';
import { CreateDbtestDto } from './dto/create-dbtest.dto';
import { UpdateDbtestDto } from './dto/update-dbtest.dto';

export interface findListParams {
  keyword: string;
  page: number;
  pageSize: number;
}

@Controller('dbtest')
export class DbtestController {
  constructor(private readonly dbtestService: DbtestService) {}

  @Post()
  create(@Body() createDbtestDto: CreateDbtestDto) {
    return this.dbtestService.create(createDbtestDto);
  }

  @Get()
  findAll(@Query() query: findListParams) {
    return this.dbtestService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dbtestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDbtestDto: UpdateDbtestDto) {
    return this.dbtestService.update(+id, updateDbtestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dbtestService.remove(+id);
  }
}
