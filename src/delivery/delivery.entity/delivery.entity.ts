import { LoanEntity } from 'src/loan/loan.entity/loan.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DeliveryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    deliveryDate: Date;

    @OneToOne(() => LoanEntity, loan => loan.delivery)
    loan: LoanEntity;

}
    