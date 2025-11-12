/* eslint-disable prettier/prettier */
import { BookEntity } from 'src/book/book.entity/book.entity';
import { DeliveryEntity } from 'src/delivery/delivery.entity/delivery.entity';
import { RateEntity } from 'src/rate/rate.entity/rate.entity';
import { UserEntity } from 'src/user/user.entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoanStatus } from './loan-status.enum';

@Entity()
export class LoanEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    loanDate: Date;

    @Column()
    expirationDate: Date;

    @Column()
    isActive: boolean;

    @Column({
        type: 'varchar',
        default: LoanStatus.CREADO
    })
    status: LoanStatus;

    @OneToMany(() => BookEntity, book => book.loan)
    books: BookEntity[];

    @ManyToOne(() => UserEntity, user => user.loans)
    user: UserEntity;

    @OneToOne(() => DeliveryEntity, delivery => delivery.loan)
    @JoinColumn()
    delivery: DeliveryEntity;

    @ManyToOne(() => RateEntity, rate => rate.loans)
    rate: UserEntity;
}   
