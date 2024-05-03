import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterCredentialsDto } from './dto/auth-credentials.dto';
import { Public } from 'src/common/decorators';

@Controller('admin')
export class AdminController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  // @Post('register')
  // create(@Body() registerCredentials: RegisterCredentialsDto) {
  //   return this.authService.adminRegistration(registerCredentials);
  // }
}
