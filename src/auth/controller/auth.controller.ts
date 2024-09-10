import { Body, Controller, Post, Get, HttpException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../dto/Register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authServices: AuthService
    ) {}

    @Post('register')
    async registerUser(@Body() userDto: RegisterUserDto) {
        const user = await this.authServices.createUser(userDto);
        return user; 
    }

    @Get()
    async getUsers() {
        const users = await this.authServices.getUsers()
        if(users.length <= 0) throw new HttpException("No users found!", 404);
        return users;
        
    }

}
