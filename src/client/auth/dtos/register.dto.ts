import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export class RegisterDto{

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    password: string;
}