/* eslint-disable prettier/prettier */
import { LoanEntity } from 'src/loan/loan.entity/loan.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RateEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    value: number;

    @Column()
    description: string;

    @OneToMany(() => LoanEntity, loan => loan.rate)
    loans: LoanEntity[];

}
