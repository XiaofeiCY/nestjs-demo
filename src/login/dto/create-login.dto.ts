import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 10, { message: '不能超过10个字符' })
  name: string;

  // @isNumber()
  age: number;
}
