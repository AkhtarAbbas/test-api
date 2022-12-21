import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';

export class UsersDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  country: string;

  @IsOptional()
  province: string;

  @IsOptional()
  city: string;

  @IsOptional()
  postalCode: number;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  authConfirmToken: number;

  @IsOptional()
  roles: Role[];
}
