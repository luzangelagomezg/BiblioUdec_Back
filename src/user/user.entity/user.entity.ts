/* eslint-disable prettier/prettier */
import { LoanEntity } from 'src/loan/loan.entity/loan.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @OneToMany(() => LoanEntity, loan => loan.user)
    loans: LoanEntity[];

}
