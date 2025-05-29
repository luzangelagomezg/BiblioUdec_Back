/* eslint-disable prettier/prettier */
import { BookEntity } from 'src/book/book.entity/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EditorialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    address: string;
    
    @OneToMany(() => BookEntity, book => book.editorial)
    books: BookEntity[];
}
