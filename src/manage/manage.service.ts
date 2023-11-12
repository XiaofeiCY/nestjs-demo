import { Injectable } from '@nestjs/common';
import { CreateManageDto, TransferMoneyDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manage } from './entities/manage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManageService {
  constructor(
    @InjectRepository(Manage) private readonly money: Repository<Manage>,
  ) {}

  transferMoney(params: TransferMoneyDto) {
    try {
      return this.money.manager.transaction(async (manage) => {
        const fromUser = await this.money.findOne({
          where: {
            id: params.fromId,
          },
        });
        const toUser = await this.money.findOne({
          where: {
            id: params.toId,
          },
        });
        if (fromUser && toUser) {
          if (fromUser.money >= params.money) {
            await manage.save(Manage, {
              id: params.fromId,
              money: fromUser.money - params.money,
            });
            await manage.save(Manage, {
              id: params.toId,
              money: toUser.money + params.money,
            });
            return 1;
          } else {
            return {
              message: '余额不足',
            };
          }
        } else {
          return {
            message: '用户不存在',
          };
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  create(createManageDto: CreateManageDto) {
    return 'This action adds a new manage';
  }

  findAll() {
    return `This action returns all manage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manage`;
  }

  update(id: number, updateManageDto: UpdateManageDto) {
    return `This action updates a #${id} manage`;
  }

  remove(id: number) {
    return `This action removes a #${id} manage`;
  }
}
