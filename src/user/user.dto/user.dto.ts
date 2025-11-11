/* eslint-disable prettier/prettier */

import {  IsString, MinLength, IsEnum, IsOptional } from "class-validator";
import { UserRole } from '../user.entity/user.entity';

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

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
