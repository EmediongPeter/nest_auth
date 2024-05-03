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
import { userTypes } from 'src/schemas/user.schema';

export class TalentCredentialsDto {
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

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  country?: string;

  @IsOptional()
  @IsEnum(['male', 'female'])
  gender?: string;

  @IsOptional()
  specialty?: string;

  @IsOptional()
  experience?: string;

  @IsOptional()
  availability?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsUrl()
  linkedIn?: string;
}

enum RecruiterRole {
  RECRUITER = 'recruiter',
}
export class RecruiterCredentialsDto {
  @ApiProperty({ description: 'name of user', required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'valid email of the company', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;

  @ApiProperty({ description: 'role', required: true })
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  @IsEnum(RecruiterRole)
  role: RecruiterRole.RECRUITER;

  @IsOptional()
  @IsPhoneNumber()
  company: string;

  @IsOptional()
  @IsUrl()
  website: string;
}
