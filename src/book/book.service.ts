/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BookEntity } from './book.entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from 'src/author/author.entity/author.entity';
import { EditorialEntity } from 'src/editorial/editorial.entity/editorial.entity';

@Injectable()
export class BookService {
    constructor(
       @InjectRepository(BookEntity)
       private readonly bookRepository: Repository<BookEntity>,
       @InjectRepository(AuthorEntity)
       private readonly authorRepository: Repository<AuthorEntity>,
       @InjectRepository(EditorialEntity)
       private readonly editorialRepository: Repository<EditorialEntity>
   ){}
    async create(book: BookEntity): Promise<BookEntity> {
        return this.bookRepository.save(book);
    }

    async findAll(): Promise<BookEntity[]> {
        return this.bookRepository.find({ relations: ["authors", "editorial"] });
    }

    async findOne(id: string): Promise<BookEntity> {
        const book = await this.bookRepository.findOne({ where: { id }, relations: ["authors", "editorial"] });
        if (!book) {
            throw new Error(`Book with id ${id} not found`);
        }
        return book;
    }

    async update(id: string, book: BookEntity): Promise<BookEntity> {
        await this.bookRepository.update(id, book);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const book = await this.bookRepository.findOne({ where: { id }, relations: ['authors'] });
        if (!book) throw new Error(`Book with id ${id} not found`);
            book.authors = [];
        await this.bookRepository.save(book); 
        await this.bookRepository.delete(id);
    }

    async associateAuthorsToBook(bookId: string, authors: AuthorEntity[]): Promise<BookEntity> {
       const book: BookEntity | null = await this.bookRepository.findOne({ where: { id: bookId }, relations: ["authors"] });

       if (!book)
         throw new Error(`Book with id ${bookId} not found`);

       for (let i = 0; i < authors.length; i++) {
         const author: AuthorEntity | null = await this.authorRepository.findOne({ where: { id: authors[i].id } });
         if (!author)
           throw new Error(`Author with id ${authors[i].id} not found`);
       }

       book.authors = authors;
       return await this.bookRepository.save(book);
    }

    async addEditorialBook(bookId: string, editorialId: string): Promise<BookEntity> {
        const book: BookEntity | null = await this.bookRepository.findOne({ where: { id: bookId }, relations: ["editorial"] });

        if (!book) {
            throw new Error(`Book with id ${bookId} not found`);
        }

        const editorial = await this.editorialRepository.findOne({ where: { id: editorialId } });
        if (!editorial) {
            throw new Error(`Editorial with id ${editorialId} not found`);
        }

        book.editorial.id = editorialId;
        return await this.bookRepository.save(book);
    }
}
