// user-update.dto.ts
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UserUpdateDto {
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
}
