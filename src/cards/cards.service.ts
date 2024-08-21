import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardsRepository: Repository<Card>,
  ) {}

  async findAll(): Promise<Card[]> {
    return this.cardsRepository.find({ relations: ['column'] });
  }

  async findOne(id: number): Promise<Card> {
    return this.cardsRepository.findOne({
      where: { id },
      relations: ['column'],
    });
  }

  async create(title: string, columnId: number): Promise<Card> {
    const card = this.cardsRepository.create({ title, column: { id: columnId } });
    return this.cardsRepository.save(card);
  }

  async remove(id: number): Promise<void> {
    await this.cardsRepository.delete(id);
  }
}