/* eslint-disable prettier/prettier */

import {  IsString, MinLength } from "class-validator";

export class UserDto {
    @IsString()
    name: string;
    
    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}
