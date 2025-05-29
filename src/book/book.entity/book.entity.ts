/* eslint-disable prettier/prettier */
import { AuthorEntity } from 'src/author/author.entity/author.entity';
import { EditorialEntity } from 'src/editorial/editorial.entity/editorial.entity';
import { LoanEntity } from 'src/loan/loan.entity/loan.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookEntity {

   @PrimaryGeneratedColumn('uuid')
   id: string;

    @Column()
    name: string;

    @Column()
    isbn: string;

    @Column()
    year: number;

    @ManyToMany(() => AuthorEntity, author => author.books)
    authors: AuthorEntity[];

    @ManyToOne(() => EditorialEntity, editorial => editorial.books)
    editorial: EditorialEntity;

    @ManyToOne(() => LoanEntity, loan => loan.books)
    loan: LoanEntity;
    
}

