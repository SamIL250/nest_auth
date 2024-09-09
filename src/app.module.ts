import { Module } from '@nestjs/common'; 
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest_auth_github',
    entities: [],
    synchronize: true,  // Automatically creates database and tables based on entities
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
