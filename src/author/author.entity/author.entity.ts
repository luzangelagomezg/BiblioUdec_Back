/* eslint-disable prettier/prettier */
import { BookEntity } from 'src/book/book.entity/book.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthorEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => BookEntity, book => book.authors)
    @JoinTable()
    books: BookEntity[];

}
