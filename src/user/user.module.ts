import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from './jwt.config';

@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        JwtModule.register(jwtConfig),
        PassportModule,
    ],
    controllers:[UserController],
    providers:[
        UserService,
        JwtAuthGuard
    ],
    exports: [UserService]

})
export class UserModule {
 
}
