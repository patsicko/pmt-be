// user.dto.ts
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  role:string;

  @IsNotEmpty()
  @IsString()
  password: string; 
}
