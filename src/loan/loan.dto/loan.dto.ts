/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsOptional } from "class-validator";
import { LoanStatus } from "../loan.entity/loan-status.enum";


export class LoanDto {
    @IsDate()
    @Type(() => Date)
    loanDate: Date;

    @IsDate()
    @Type(() => Date)
    expirationDate: Date;

    @IsBoolean()
    isActive: boolean;

    @IsOptional()
    @IsEnum(LoanStatus)
    status?: LoanStatus;
}
