import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Change to 'mysql' for MySQL
      host: 'localhost',
      port: 5432, // 3306 for MySQL
      username: '',
      password: '',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,  // Auto-sync DB with your models (disable in production)
    }),
    BookModule,
  ],
})
export class AppModule {}

