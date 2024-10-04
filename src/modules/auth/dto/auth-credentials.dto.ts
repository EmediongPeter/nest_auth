import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsJWT,
} from 'class-validator';

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
