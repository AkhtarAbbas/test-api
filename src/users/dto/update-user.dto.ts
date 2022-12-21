import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { Role } from '../enums/role.enum';
import { UsersDTO } from './create-user.dto';

export class UpdateUserDto extends PartialType(UsersDTO) {
  @IsOptional()
  email: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
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
}
