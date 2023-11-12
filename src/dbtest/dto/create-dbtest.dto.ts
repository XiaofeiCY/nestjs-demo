import { ApiProperty } from '@nestjs/swagger';

interface defaultJson {
  name: string;
  age: number;
}

export class CreateDbtestDto {
  @ApiProperty({
    example: '蠢羊',
    required: true,
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 18,
    required: true,
  })
  age: number;

  @ApiProperty({
    example: '这是一段默认描述',
    default: '默认描述',
  })
  desc: string;

  @ApiProperty({
    default: ['1', '2', '3'],
  })
  subject: string[];

  @ApiProperty({
    default: { name: '默认名字', age: '默认年龄' },
  })
  chunyangJson: defaultJson;
}
