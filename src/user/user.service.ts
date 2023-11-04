import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>
    ){}

   async getAll():Promise<User[]>{

    return await this.userRepository.find()
   }

  async createUser(user:User):Promise<User>{
    return await this.userRepository.save(user)
  }

  async getOne(id:number):Promise<User | undefined>{
     return await this.userRepository.findOneBy({id})
  }

  async findByEmail(email:string):Promise<User | undefined>{
    return await this.userRepository.findOneBy({email})
 }

  async updateUser(id:number,user:User ):Promise<any>{
    return await this.userRepository.update(id,user)
  }

 async deleteUser(id:number):Promise<void>{
    await this.userRepository.delete({id})
 }

}
