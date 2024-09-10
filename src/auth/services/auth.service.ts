import { HttpException, Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/Entities/User';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dto/Register.dto';
import { LoginUserDto } from '../dto/Login.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) 
    {}
    async validateUser({username, password}: LoginUserDto) { 
        const checkUser = await this.userRepository.createQueryBuilder('user')
        .where(
            "user.username= :username", {username}
        ).andWhere(
            "user.password= :password", {password}
        ).execute()

        if(!checkUser) throw new HttpException("incorrect username and password!", 404)
            
    }

    async getUsers() {
        const users = await this.userRepository.createQueryBuilder().getMany();
        return  users; 
    } 

    async createUser({username, email, password, confirm_password}: RegisterUserDto) {
        const checkUser = await this.userRepository.find({where: {
            username: username
        }})

        if(checkUser.length > 0) throw new HttpException("Username already taken!", 404);
        if(password != confirm_password) throw new HttpException("Passwords do not match!", 404);
        const user = this.userRepository.createQueryBuilder()
        .insert()
        .into(User)
        .values({
            username: username,
            email: email,
            password: password
        })

        return user;

    }
}
