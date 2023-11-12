import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dbtest } from './dbtest.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Dbtest)
  user: Dbtest;
}
