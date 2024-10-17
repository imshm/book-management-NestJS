import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto, UpdateBookDto } from './book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Fetch all books
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  // Fetch a book by id
  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  // Create a new book
  async create(createBookDto: CreateBookDto): Promise<Book> {
    // Optionally: Check for duplicate title, author, etc.
    const book = this.bookRepository.create(createBookDto);
    try {
      return await this.bookRepository.save(book);
    } catch (error) {
      throw new BadRequestException('Failed to create book. Please check your input.');
    }
  }

  // Update a book by id
  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    Object.assign(book, updateBookDto);
    try {
      return await this.bookRepository.save(book);
    } catch (error) {
      throw new BadRequestException('Failed to update book. Please check your input.');
    }
  }

  // Delete a book by id
  async remove(id: number): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    await this.bookRepository.delete(id);
  }
}
