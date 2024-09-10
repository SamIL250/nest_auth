import { IsNotEmpty, IsString,  IsEmail} from 'class-validator'

export class RegisterUserDto{ 
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirm_password: string;
}