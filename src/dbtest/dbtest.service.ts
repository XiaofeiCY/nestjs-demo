import { Injectable } from '@nestjs/common';
import { UpdateDbtestDto } from './dto/update-dbtest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Dbtest } from './entities/dbtest.entity';
import { CreateDbtestDto } from './dto/create-dbtest.dto';
import { findListParams, tagParams } from './dbtest.controller';
import { Tags } from './entities/tags.entity';

@Injectable()
export class DbtestService {
  constructor(
    @InjectRepository(Dbtest) private readonly dbtest: Repository<Dbtest>,
    @InjectRepository(Tags) private readonly tags: Repository<Tags>,
  ) {}

  create(createUserDto: CreateDbtestDto) {
    const data = new Dbtest();
    data.name = createUserDto.name;
    data.age = createUserDto.age;
    data.desc = createUserDto.desc;
    return this.dbtest.save(data);
  }

  async findAll(query: findListParams) {
    const data = await this.dbtest.find({
      relations: ['tags'],
      where: {
        name: Like(`%${query.keyword}%`),
      },
      order: {
        // desc 倒序，asc:正序
        id: 'desc',
      },
      skip: (query.page - 1) * query.pageSize, // page最小为1
      take: query.pageSize,
    });
    const total = await this.dbtest.count({
      where: {
        name: Like(`%${query.keyword}%`),
      },
    });

    return {
      data,
      total,
    };
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

  async addTags(params: tagParams) {
    const userInfo = await this.dbtest.findOne({
      where: {
        id: params.userId as unknown as number,
      },
    });
    const tagList: Tags[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      const T = new Tags();
      T.name = params.tags[i];
      await this.tags.save(T);
      tagList.push(T);
    }
    userInfo.tags = tagList;
    await this.dbtest.save(userInfo);
    return true;
  }
}
