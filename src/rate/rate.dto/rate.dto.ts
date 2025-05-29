/* eslint-disable prettier/prettier */

import { IsNumber, IsString } from "class-validator";

export class RateDto {
    @IsNumber()
    value: number;

    @IsString()
    description: string;
}
