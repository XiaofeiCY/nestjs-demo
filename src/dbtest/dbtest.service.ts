import { Injectable } from '@nestjs/common';
import { UpdateDbtestDto } from './dto/update-dbtest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Dbtest } from './entities/dbtest.entity';
import { CreateDbtestDto } from './dto/create-dbtest.dto';

@Injectable()
export class DbtestService {
  constructor(
    @InjectRepository(Dbtest) private readonly dbtest: Repository<Dbtest>,
  ) {}

  create(createUserDto: CreateDbtestDto) {
    const data = new Dbtest();
    data.name = createUserDto.name;
    data.age = createUserDto.age;
    data.desc = createUserDto.desc;
    return this.dbtest.save(data);
  }

  findAll(query: { name: string }) {
    return this.dbtest.find({
      where: {
        name: Like(`%${query.name}%`),
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} dbtest`;
  }

  update(id: number, updateDbtestDto: UpdateDbtestDto) {
    return this.dbtest.update(id, updateDbtestDto);
  }

  remove(id: number) {
    return this.dbtest.delete(id);
  }
}
