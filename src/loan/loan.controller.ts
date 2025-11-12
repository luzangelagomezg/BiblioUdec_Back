/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanDto } from './loan.dto/loan.dto';
import { LoanEntity } from './loan.entity/loan.entity';
import { plainToInstance } from 'class-transformer';
import { BookEntity } from 'src/book/book.entity/book.entity';

@Controller('loans')
export class LoanController {
    constructor(private readonly loanService: LoanService) {}

    @Post()
    create(@Body() loanDto: LoanDto): Promise<LoanEntity> {
        const loan: LoanEntity = plainToInstance(LoanEntity, loanDto);
        return this.loanService.create(loan);
    }

    @Get()
    findAll(): Promise<LoanEntity[]> {
        return this.loanService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<LoanEntity> {
        return this.loanService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() loanDto: LoanDto): Promise<LoanEntity> {
        const loan: LoanEntity = plainToInstance(LoanEntity, loanDto);
        return this.loanService.update(id, loan);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.loanService.remove(id);
    }

    @Put(':loanId/users/:userId')
    associateUser(@Param('loanId') loanId: string, @Param('userId') userId: string): Promise<LoanEntity> {
        return this.loanService.associateUserToLoan(loanId, userId);
    }

    @Put(':loanId/delivery/:deliveryId')
    associateDelivery(@Param('loanId') loanId: string, @Param('deliveryId') deliveryId: string): Promise<LoanEntity> {
        return this.loanService.associateDeliveryToLoan(loanId, deliveryId);
    }

    @Put(':loanId/rates/:rateId')
    associateRate(@Param('loanId') loanId: string, @Param('rateId') rateId: string): Promise<LoanEntity> {
        return this.loanService.associateRateToLoan(loanId, rateId);
    }

    @Put(':loanId/books')
    associateBooks(@Param('loanId') loanId: string, @Body() books: BookEntity[]): Promise<LoanEntity> {
        return this.loanService.associateBooksToLoan(loanId, books);
    }

    @Post(':id/approve')
    approveLoan(@Param('id') id: string): Promise<LoanEntity> {
        return this.loanService.approveLoan(id);
    }

    @Post(':id/reject')
    rejectLoan(@Param('id') id: string): Promise<LoanEntity> {
        return this.loanService.rejectLoan(id);
    }

    @Post(':id/finalize')
    finalizeLoan(@Param('id') id: string): Promise<LoanEntity> {
        return this.loanService.finalizeLoan(id);
    }
}
