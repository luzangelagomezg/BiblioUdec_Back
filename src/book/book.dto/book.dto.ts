/* eslint-disable prettier/prettier */

import { IsNumber, IsString } from "class-validator";

export class BookDto {
    @IsString()
    isbn: string;

    @IsNumber()
    year: number;
}
