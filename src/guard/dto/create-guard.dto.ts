import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
  @ApiProperty({ example: '蠢羊', required: true, type: 'string' }) // swagger接口参数描述，并提供默认值
  name: string;
  @ApiProperty({ example: 18 })
  age: number;
}
