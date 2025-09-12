import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @IsNumber()
  roleId: number;

  @IsOptional()
  @IsNumber()
  campusId?: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  phoneAlt?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsString()
  givenName?: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}
