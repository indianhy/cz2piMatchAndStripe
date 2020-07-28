import {IsNotEmpty} from 'class-validator'
export class CreateUserDto {

    @IsNotEmpty()
    username:string

    @IsNotEmpty()
    identifier:string

    @IsNotEmpty()
    otp:string

    @IsNotEmpty()
    recovery_code:string

    @IsNotEmpty()
    first_name:string

    @IsNotEmpty()
    last_name:string

    @IsNotEmpty()
    department:string

    @IsNotEmpty()
    location:string

    @IsNotEmpty()
    country:string

    @IsNotEmpty()
    planet:string   
}