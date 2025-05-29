/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { LoanEntity } from './loan.entity/loan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity/user.entity';
import { DeliveryEntity } from 'src/delivery/delivery.entity/delivery.entity';
import { RateEntity } from 'src/rate/rate.entity/rate.entity';
import { BookEntity } from 'src/book/book.entity/book.entity';

@Injectable()
export class LoanService {
    constructor(
       @InjectRepository(LoanEntity)
       private readonly loanRepository: Repository<LoanEntity>,
       @InjectRepository(UserEntity)
       private readonly userRepository: Repository<UserEntity>,
       @InjectRepository(DeliveryEntity)
       private readonly deliveryRepository: Repository<DeliveryEntity>,
       @InjectRepository(RateEntity)
       private readonly rateRepository: Repository<RateEntity>,
       @InjectRepository(BookEntity)
       private readonly bookRepository: Repository<BookEntity>
   ){}
    async create(loan: LoanEntity): Promise<LoanEntity> {
        return this.loanRepository.save(loan);
    }

    async findAll(): Promise<LoanEntity[]> {
        return this.loanRepository.find({relations: ["books","user","delivery","rate"]});
    }

    async findOne(id: string): Promise<LoanEntity> {
        const loan = await this.loanRepository.findOne({
            where: { id },
            relations: ["books", "user", "delivery", "rate"]
        });
        if (!loan) {
            throw new Error(`Loan with id ${id} not found`);
        }
        return loan;
    }

    async update(id: string, loan: LoanEntity): Promise<LoanEntity> {
        await this.loanRepository.update(id, loan);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.loanRepository.delete(id);
    }

    async associateUserToLoan(loanId: string, userId: string): Promise<LoanEntity> {
        const loan = await this.loanRepository.findOne({ where: { id: loanId }, relations: ["user"] });
        if (!loan) {
            throw new Error(`Loan with id ${loanId} not found`);
        }
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }
        loan.user = user;
        return this.loanRepository.save(loan);
    }

    async associateDeliveryToLoan(loanId: string, deliveryId: string): Promise<LoanEntity> {
        const loan = await this.loanRepository.findOne({ where: { id: loanId }, relations: ["delivery"] });
        if (!loan) {
            throw new Error(`Loan with id ${loanId} not found`);
        }
        const delivery = await this.deliveryRepository.findOneBy({ id: deliveryId });
        if (!delivery) {
            throw new Error(`Delivery with id ${deliveryId} not found`);
        }
        loan.delivery = delivery;
        return this.loanRepository.save(loan);
    }

    async associateRateToLoan(loanId: string, rateId: string): Promise<LoanEntity> {
        const loan = await this.loanRepository.findOne({ where: { id: loanId }, relations: ["rate"] });
        if (!loan) {
            throw new Error(`Loan with id ${loanId} not found`);
        }
        const rate = await this.rateRepository.findOneBy({ id: rateId });
        if (!rate) {
            throw new Error(`Rate with id ${rateId} not found`);
        }
        loan.rate.id = rate.id;
        return this.loanRepository.save(loan);
    }

    async associateBooksToLoan(loanId: string, books: BookEntity[]): Promise<LoanEntity> {
        const loan = await this.loanRepository.findOne({ where: { id: loanId }, relations: ["books"] });
        if (!loan) {
            throw new Error(`Loan with id ${loanId} not found`);
        }

        for (let i = 0; i < books.length; i++) {
            const book = await this.bookRepository.findOneBy({ id: books[i].id });
            if (!book) {
                throw new Error(`Book with id ${books[i].id} not found`);
            }
        }

        loan.books = books;
        return this.loanRepository.save(loan);
    }
}
