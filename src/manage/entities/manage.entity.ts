import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  money: number;
}
