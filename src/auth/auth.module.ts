import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/Entities/User';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: "key123",
    signOptions: {expiresIn: '1h'}
  })],
  controllers: [AuthController],
  providers: [AuthService]
})  
export class AuthModule {}
