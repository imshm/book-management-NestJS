import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  @MaxLength(100, { message: 'Title must be shorter than or equal to 100 characters' })
  title: string;

  @IsNotEmpty({ message: 'Author is required' })
  @IsString()
  @MaxLength(50, { message: 'Author name must be shorter than or equal to 50 characters' })
  author: string;

  @CreateDateColumn({ type: 'timestamp' })
  publishedDate: Date;

  @MaxLength(500, { message: 'Summary must be shorter than or equal to 500 characters' })
  summary: string;
}

export class UpdateBookDto {
  @IsString()
  @MaxLength(100, { message: 'Title must be shorter than or equal to 100 characters' })
  title?: string;

  @IsString()
  @MaxLength(50, { message: 'Author name must be shorter than or equal to 50 characters' })
  author?: string;

  @MaxLength(500, { message: 'Summary must be shorter than or equal to 500 characters' })
  summary?: string;
}
