import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {EmailService} from '../email/email.service'
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { UserService } from '../user/user.service';
import {SmsService} from "../sms/sms.service"


@Controller('courses')
@Injectable() 
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly emailService: EmailService,
    private readonly userService:UserService,
    private readonly smsService:SmsService
    ) {}
 
  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Post('create')
  async create(@Body() course: Course): Promise<Course> {

    const newCourse = await this.courseService.create(course);

  const allUsers= await this.userService.getAll();

  
  const allEmails = allUsers.map(user => user.email);
  const allNames = allUsers.map(user => user.lastName);
  const allPhones = allUsers.map(user => user.phone);

  for(let i=0;i<allEmails.length;i++){
    const userEmail = allEmails[i];
    const userName = allNames[i];
    const phone= allPhones[i]

    const message = `Dear ${userName} we wanted to let you know that a new course has been created`;
      await this.smsService.sendSms(phone, message);
    const courseLink = `http://localhost:8000/api/courses/${newCourse.id}`;
    await this.emailService.sendCourseCreatedEmail(userName,userEmail, courseLink);
  }

  
  
    return newCourse;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() course: Course): Promise<Course> {
    return this.courseService.update(id, course);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.courseService.remove(id);
  }
}
