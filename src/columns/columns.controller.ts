import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnEntity } from './column.entity';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  async findAll(): Promise<ColumnEntity[]> {
    return this.columnsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ColumnEntity> {
    const column = await this.columnsService.findOne(id);
    if (!column) {
      throw new Error('Column not found');
    }
    return column;
  }

  @Post()
  async create(@Body() createColumnDto: { title: string; userId: number }): Promise<ColumnEntity> {
    return this.columnsService.create(createColumnDto.title, createColumnDto.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const result = await this.columnsService.remove(id);
    if (result.affected === 0) {
      throw new Error('Column not found');
    }
  }
}