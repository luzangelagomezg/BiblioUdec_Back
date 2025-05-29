/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsBoolean, IsDate } from "class-validator";


export class LoanDto {
    @IsDate()
    @Type(() => Date)
    loanDate: Date;

    @IsDate()
    @Type(() => Date)
    expirationDate: Date;

    @IsBoolean()
    isActive: boolean;
}
