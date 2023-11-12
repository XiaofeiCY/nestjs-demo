import { ApiProperty } from '@nestjs/swagger';

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
  })
  desc: string;
}
