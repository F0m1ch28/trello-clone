import { Entity, Column as EntityColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ColumnEntity } from '../columns/column.entity';
import { Comment } from '../comments/comment.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @EntityColumn()
  title: string;

  @ManyToOne(() => ColumnEntity, (column) => column.cards)
  column: ColumnEntity;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];
}