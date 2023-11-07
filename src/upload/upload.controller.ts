import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  /**
   * 创建上传文件函数
   */
  @Post('album')
  @UseInterceptors(FileInterceptor('file')) //  用于支持文件上传的函数装饰器，单个文件用FileInterceptor，批量上传用FilesInterceptor
  upload(@UploadedFile() file) {
    /**
     * 通过@UploadedFile()读取上传文件
     * 具体调用方法是：
     * 在apifox里面输入请求地址，注意是post格式
     * 然后选择body下面的form-data
     * 参数名写file，参数类型选择file
     * 此时参数值就会出来一个upload按钮
     * 点击选择图片后点击发送按钮
     */
    console.log('===', file);
    return '上传图片成功~~~';
  }

  // 下载图片
  // download直接下载写法
  @Get('export')
  download(@Res() res: Response) {
    const url = join(__dirname, '../image/1699327606820.png');
    res.download(url);
  }

  // 文件流写法
  // 需要配合前端解析文件流Blob的形式才能正常获取
  @Get('stream')
  async downloadStream(@Res() res: Response) {
    const url = join(__dirname, '../image/1699327606820.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);

    //   设置返回流请求头，固定写法
    res.setHeader('Content-type', 'application-octet-stream');
    res.setHeader('Content-Disposition', 'attachment;filename=chunyang');

    tarStream.pipe(res);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
