import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CourseService } from './course/course.service';
import { CourseModule } from './course/course.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { EmailService } from './email/email.service';
import { SmsService } from './sms/sms.service';
import { SmsModule } from './sms/sms.module';
import { AdminSeederProvider } from './user/admin-seeder.provider';

import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './user/jwt.config';
dotenv.config();

console.log('Postgres URL:', process.env.postgresURL);


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env', 
      isGlobal:true
    }),
    JwtModule.register(jwtConfig),
    // MongooseModule.forRoot('mongodb+srv://patsicko:cZdht6dn3r8U2unO@cluster0.kaocuji.mongodb.net/pmsdb?retryWrites=true&w=majority'),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:process.env.postgresURL,
      entities: ["dist/**/*.entity.js"],
      autoLoadEntities:true,
      synchronize: true,
      ssl: true
    }),
  ProductModule,
  CourseModule,
  UserModule,
 
],
  
  controllers: [AppController],
  providers: [AppService,AdminSeederProvider],
})
export class AppModule {}

