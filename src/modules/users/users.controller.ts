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
  EntriesDto,
  TalentsDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../../common/decorators';
import { Request } from 'express';
import { Entries, Talent } from './schemas/user.schema';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register/entry')
  entries(@Body() entriesDto: EntriesDto) : Promise<Entries>{
    return this.usersService.entries(entriesDto);
  }

  @Public()
  @Post('register/talent')
  talents(@Body() talentsDto: TalentsDto) : Promise<Talent>{
    return this.usersService.talents(talentsDto);
  }

  

  // @Get('user')
  // getUser(
  //   @Req() request: Request, //: Promise<User>
  // ) {
  //   const id = request.user["userId"]
  //   return this.usersService.getUserProfile(id);
  // }
}
