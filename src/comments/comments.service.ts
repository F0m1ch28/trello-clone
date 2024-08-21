import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({ relations: ['card'] });
  }

  async findOne(id: number): Promise<Comment> {
    return this.commentsRepository.findOne({
      where: { id },
      relations: ['card'],
    });
  }

  async create(text: string, cardId: number): Promise<Comment> {
    const comment = this.commentsRepository.create({ text, card: { id: cardId } });
    return this.commentsRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}