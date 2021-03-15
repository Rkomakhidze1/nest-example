/* eslint-disable prettier/prettier */
import { Author } from 'src/authors/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  pages: number;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
