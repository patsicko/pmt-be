import { BadRequestException, Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {Request,Response} from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { UserUpdateDto } from './user-update.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService,
        private readonly jwtService: JwtService
        ){}
    
    @Get('all')
    getAll(){
        return this.userService.getAll()
    }

    @Post()
    async createUser(@Body() userDto:UserDto):Promise<User>{

        const existingUser = await this.userService.findByEmail(userDto.email);

        if (existingUser) {
          throw new ConflictException('A user with this email already exists');
        }
        const user = new User()

        user.firstName=userDto.firstName;
        user.lastName=userDto.lastName;
        user.phone=userDto.phone;
        user.email=userDto.email

        const saltRounds=10;
        const hashedPassword= await bcrypt.hash(userDto.password,saltRounds)
        user.password=hashedPassword;

        return this.userService.createUser(user)
    }

    @Get(':id')
    getOne(@Param('id') id:number):Promise<User>{
        return this.userService.getOne(id)
    }

    @Put(':id')
    async updateUser(@Param('id') id:number,@Body() userDto:UserUpdateDto):Promise<User>{

        const existingUser = await this.userService.getOne(id);



        if(!existingUser){
            throw  new NotFoundException(`User with ID ${id} not found`)
        }
        
        existingUser.firstName=userDto.firstName;
        existingUser.lastName=userDto.lastName;
        existingUser.phone=userDto.phone;
        existingUser.email=userDto.email

        return this.userService.updateUser(id,existingUser)
    }

   @Delete(':id')
   deleteUser(@Param('id') id:number):Promise<void>{
    return this.userService.deleteUser(id)

   }


   @Post('login')
   async login(
    @Body('email') email:string,
    @Body('password') password:string,
    @Req() request: Request,
    @Res({passthrough:true}) response:Response
   ){
    const user= await this.userService.findByEmail(email);

    if(!user){
        throw new BadRequestException('Invalid credentials');
    }

    if(!await bcrypt.compare(password,user.password)){
        throw new BadRequestException('Invalid credentials');  
    }

    const payload = { sub: user };
    const jwt = await this.jwtService.signAsync(payload);

   response.cookie('jwt',jwt,{httpOnly:true})
 
    return {
        message:'success'
    }
   }

  @Get()
  async user(@Req() request:Request){
    
    try{
        const cookie = request.cookies['jwt'];

        
     const data= await this.jwtService.verifyAsync(cookie);
     if(!data){
        throw new UnauthorizedException();
     } 
     const {password, ...result}=data.sub;

    
    return result;
   

    }catch(e){
        throw new UnauthorizedException();
    }
  }
   
   @Post('logout')
   async logout(@Res({passthrough:true}) response:Response) {
    response.clearCookie('jwt');

    return {
        message:'success'
    }
}
}
