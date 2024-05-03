import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  RecruiterCredentialsDto,
  TalentCredentialsDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../../common/decorators';
import { Request } from 'express';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register/talent')
  registerAsTalent(
    @Body() talentCredentialsDto: TalentCredentialsDto, //: Promise<User>
  ) {
    return this.usersService.registerAsTalent(talentCredentialsDto);
  }

  @Public()
  @Post('register/recruiter')
  registerAsRecruiter(
    @Body() recruiterCredentialsDto: RecruiterCredentialsDto, //: Promise<User>
  ) {
    return this.usersService.registerAsRecruiter(recruiterCredentialsDto);
  }

  @Get('user')
  getUser(
    @Req() request: Request, //: Promise<User>
  ) {
    const id = request.user["userId"]
    return this.usersService.getUserProfile(id);
  }
}
