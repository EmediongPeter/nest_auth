import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register/entry')
  entries(@Body() entriesDto: EntriesDto): Promise<Entries> {
    return this.usersService.entries(entriesDto);
  }

  @Public()
  @Post('register/talent')
  @UseInterceptors(FileInterceptor('resume'))
  talents(
    @Body() talentsDto: TalentsDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Talent> {
    // console.log(talentsDto, file)
    return this.usersService.talents(talentsDto, file);
  }

  @Get('entries')
  getEntries(): Promise<Entries[]> {
    return this.usersService.findEntries();
  }

  @Get('talents')
  getTalents(): Promise<Talent[]> {
    return this.usersService.findTalents();
  }

  // @Get('user')
  // getUser(
  //   @Req() request: Request, //: Promise<User>
  // ) {
  //   const id = request.user["userId"]
  //   return this.usersService.getUserProfile(id);
  // }
}
