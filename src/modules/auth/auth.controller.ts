import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  LoginCredentialsDto,
  TokenCredentialstDto,
  RegisterCredentialsDto,
} from './dto/auth-credentials.dto';
import { Request } from 'express';
import { RefreshToken } from 'src/schemas';
import { Public } from 'src/common/decorators';
import { IAuthUser, LoginResponse } from './types';
import { RefreshJwtAuthGuard } from 'src/common/guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  create(@Body() registerCredentials: RegisterCredentialsDto) {
    return this.authService.register(registerCredentials);
  }

   @Public()
  @Post('login')
  @ApiTags('Log In')
  @ApiOperation({ description: 'Logging user into the system' })
  login(
    @Body() { email, password }: LoginCredentialsDto,
  ): Promise<LoginResponse> {
    return this.authService.login(email, password);
  }

  @ApiOperation({
    tags: ['Log out from current device'],
    summary: 'Logs out user',
  })
  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Body() { refreshToken }: TokenCredentialstDto,
  ): Promise<void> {
    return this.authService.logout(refreshToken);
  }
}
