import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsLowercase,
  IsOptional,
  IsPhoneNumber,
  IsEnum,
  IsUrl,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: 'firstName of user', required: true })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'last name of user', required: true })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'valid email of user', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;

  @ApiProperty({ description: 'required', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class EntriesDto {
  @ApiProperty({ description: 'firstName of user', required: true })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'last name of user', required: true })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'valid email of user', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;

  @ApiProperty({ description: 'required', required: true })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({ description: 'address required', required: true })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'skill of choice required', required: true })
  @IsNotEmpty()
  @IsString()
  skill: string;

  @ApiProperty({ description: 'state of origin required', required: true })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'local government of origin required', required: true })
  @IsNotEmpty()
  @IsString()
  locality: string;

  @ApiProperty({ description: 'age required', required: true })
  @IsNotEmpty()
  @IsString()
  ageRange: string;

  @ApiProperty({ description: 'referral source required', required: true })
  @IsNotEmpty()
  @IsString()
  discoveryMethod: string
}

export class TalentsDto {
  @ApiProperty({ description: 'firstName of user', required: true })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'last name of user', required: true })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'valid email of user', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;

  @ApiProperty({ description: 'gender required', required: true })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({ description: 'working phone number required', required: true })
  @IsNotEmpty()
  @IsString()
  // @IsPhoneNumber()
  phone: string;

  @ApiProperty({ description: 'address of residence required', required: true })
  @IsNotEmpty()
  @IsString()
  locality: string;

  @ApiProperty({ description: 'skill of expertise required', required: true })
  @IsNotEmpty()
  @IsString()
  skill: string;

  @ApiProperty({ description: 'experience level', required: true, enum: ['Beginner', 'Intermediate', 'Expert', 'Professional'] })
  @IsNotEmpty()
  @IsString()
  experience: string;

  @ApiProperty({ description: 'work preference', required: true, enum: ['Full-time', 'Part-time', 'Remote', 'On-site', 'Hybrid', 'Shift Work'] })
  @IsNotEmpty()
  @IsString()
  availability: string;

  @ApiProperty({ description: 'your active linkedin url or any other active channel', required: true })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  smLink: string;

  @ApiProperty({ description: 'cv or resume', required: true })
  // @IsNotEmpty()
  // @IsString()
  // @IsUrl()
  resume: string;
}

