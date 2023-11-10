import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * 定义表
 */
@Entity()
export class Dbtest {
  // 主键自增
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    select: true, // 查询时，过滤掉密码字段
    comment: '这是一段注释',
    default: '123456',
    nullable: true, //能否为空
  })
  password: string;

  @Column()
  age: number;

  @CreateDateColumn({ type: 'timestamp' }) // 自动生成数据，类型定义对应数据库里面的timestamp
  createTime: Date;

  @Generated('uuid') // 自动生成列
  uuid: string;

  @Column({
    type: 'enum', //枚举类型一定要这里指明枚举，不然同步到数据库会出问题
    enum: [1, 2, 3, 4, 5],
    default: 3,
  })
  chunyangEnum: number;

  @Column('simple-array')
  subject: string[];

  @Column('simple-json') // 这种会自动调用JSON.stringfy函数，把值改为json格式存入数据库
  chunyangJson: { name: string; age: number }; //
}
