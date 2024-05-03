import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsAdmin } from 'src/common/decorators/is-admin.decorator';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @IsAdmin()
  @Get('talents')
  getTalents() {
    return this.usersService.getAllTalents();
  }

  @IsAdmin()
  @Get('recruiters')
  getRecruiters() {
    return this.usersService.getAllRecruiters();
  }

  // @IsAdmin()
  // @Get('users/count')
  // getCount(@Query() data: QueryUserDto): Promise<number> {
  //   return this.usersService.getCount(data);
  // }

  // createProfile(){}
}
