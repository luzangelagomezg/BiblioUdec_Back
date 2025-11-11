/* eslint-disable prettier/prettier */
import { LoanEntity } from 'src/loan/loan.entity/loan.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

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

    // Store only the hashed password; exclude from default selects
    // Mark nullable to avoid migration failure for existing rows when synchronize=true
    @Column({ select: false, nullable: true })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @OneToMany(() => LoanEntity, loan => loan.user)
    loans: LoanEntity[];

}
