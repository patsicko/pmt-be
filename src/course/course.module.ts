import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import {EmailModule} from "../email/email.module"
import { UserModule } from 'src/user/user.module';
import {SmsModule} from '../sms/sms.module';




@Module({
  imports:[
    TypeOrmModule.forFeature([Course]),
    EmailModule,
    UserModule,
    SmsModule
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
