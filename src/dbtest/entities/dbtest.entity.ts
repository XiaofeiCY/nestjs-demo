import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  password: string;
  @Column()
  age: number;
}
