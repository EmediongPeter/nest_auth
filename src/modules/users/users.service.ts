import { Inject, Injectable } from '@nestjs/common';
import {
  RecruiterCredentialsDto,
  TalentCredentialsDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InvalidEmailOrPasswordException } from '../../common/exceptions/forbidden.exception';
import { UserRepository } from 'src/repositories';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async registerAsTalent(talentCredentialsDto: TalentCredentialsDto) {
    const user = await this.userRepo.registerTalent({
      ...talentCredentialsDto,
    });

    return user;
  }

  async registerAsRecruiter(recruiterCredentialsDto: RecruiterCredentialsDto) {
    const user = await this.userRepo.registerRecruiter({
      ...recruiterCredentialsDto,
    });

    return user;
  }

  async getUserProfile(id: any) {
    const user = await this.userRepo.getUserProfile(id);
    return user;
  }

  async getAllTalents(data?: any) {
    const talents = await this.userRepo.getAllTalents(data);

    return talents;
  }

  async getAllRecruiters(data?: any) {
    const Recruiters = await this.userRepo.getAllRecruiters(data);

    return Recruiters;
  }

  // async getCount(data: QueryUserDto): Promise<number> {
  //   // const count = await this.userRepo.getCount(data);
  //   // return count;
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
