import { Entity, Column as EntityColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ColumnEntity } from '../columns/column.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @EntityColumn({ unique: true })
  email: string;

  @EntityColumn()
  password: string;

  @OneToMany(() => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];
}