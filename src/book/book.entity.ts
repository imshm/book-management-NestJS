import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  @MaxLength(100, { message: 'Title must be shorter than or equal to 100 characters' })
  title: string;

  @Column()
  @IsNotEmpty({ message: 'Author is required' })
  @IsString()
  @MaxLength(50, { message: 'Author name must be shorter than or equal to 50 characters' })
  author: string;

  @CreateDateColumn({ type: 'timestamp' })
  publishedDate: Date;

  @Column()
  @MaxLength(500, { message: 'Summary must be shorter than or equal to 500 characters' })
  summary: string;
}
