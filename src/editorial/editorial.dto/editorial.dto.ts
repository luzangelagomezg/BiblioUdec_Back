import { IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class EditorialDto {

    @IsString()
    name: string;
    
    @IsString()
    address: string;
}
