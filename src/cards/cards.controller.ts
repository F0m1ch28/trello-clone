import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Card } from './card.entity';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cards' })
  async findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by ID' })
  async findOne(@Param('id') id: number) {
    return this.cardsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        columnId: { type: 'number' },
      },
      required: ['title', 'columnId'],
    },
  })
  async create(@Body() createCardDto: { title: string; columnId: number }) {
    return this.cardsService.create(createCardDto.title, createCardDto.columnId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a card by ID' })
  async remove(@Param('id') id: number) {
    await this.cardsService.remove(id);
    return { message: 'Card successfully deleted' };
  }
}