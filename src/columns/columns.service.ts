import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ColumnEntity } from './column.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnsRepository: Repository<ColumnEntity>,
  ) {}

  async findAll(): Promise<ColumnEntity[]> {
    return this.columnsRepository.find({ relations: ['user', 'cards'] });
  }

  async findOne(id: number): Promise<ColumnEntity | undefined> {
    return this.columnsRepository.findOne({
      where: { id },
      relations: ['user', 'cards'],
    });
  }

  async create(title: string, userId: number): Promise<ColumnEntity> {
    const column = this.columnsRepository.create({ title, user: { id: userId } });
    return this.columnsRepository.save(column);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.columnsRepository.delete(id);
  }
}