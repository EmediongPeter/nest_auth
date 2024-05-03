import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsJWT,
  IsLowercase,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsUrl,
} from 'class-validator';
import { userTypes } from 'src/schemas/user.schema';

export class RegisterCredentialsDto {
  @ApiProperty({ description: 'firstName of user', required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'user role description ',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  role: userTypes;
}


export class RegisterCredentialDto {
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

  @ApiProperty({
    description: 'Only for admins upon registration',
    required: false,
  })
  @IsOptional()
  @IsString()
  passcode: string;

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

export class LoginCredentialsDto {
  @ApiProperty({ description: 'valid email of user', required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'user password upon registration',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class TokenCredentialstDto {
  @ApiProperty({
    description: 'Input user refresh token for validation',
    required: true,
  })
  @IsJWT()
  refreshToken: string;
}
