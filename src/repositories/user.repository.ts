import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import {
  Recruiter,
  RecruiterDocument,
  Talent,
  TalentDocument,
} from 'src/schemas';
import {
  Authentication,
  AuthenticationDocument,
} from 'src/schemas/auth.schema';

@Injectable()
export class UserRepository {
  constructor(
    // @InjectModel(Cat.name, 'cats') private catModel: Model<Cat>
    @InjectModel(Talent.name)
    private readonly talentSchema: Model<TalentDocument>,
    @InjectModel(Recruiter.name)
    private readonly recruiterSchema: Model<RecruiterDocument>,
    @InjectModel(Authentication.name)
    private readonly AuthSchema: Model<AuthenticationDocument>,
  ) {}

  async authUser(data: Record<string, any>) {
    const user = await this.AuthSchema.findOneAndUpdate(
      { email: data.email },
      data,
      {new: true, upsert: true },
    );

    return user;
  }

  async registerTalent(data: Record<string, any>) {
    const user = await this.talentSchema.create(data);
    await this.authUser({ ...data, profile: user._id });
    return user;
  }

  async registerRecruiter(data: Record<string, any>) {
    const user = await this.recruiterSchema.create(data);
    await this.authUser({ ...data, profile: user._id });
    return user;
  }

  async getAllTalents(data: any) {
    const users = await this.talentSchema.find(data);

    return users;
  } 

  async getAllRecruiters(data: any) {
    const users = await this.recruiterSchema.find(data);

    return users;
  }

  async getTalentCount(query: any) {
    const users = await this.talentSchema.count(query);

    return users;
  }

  async getRecruiterCount(query: any) {
    const users = await this.recruiterSchema.count(query);

    return users;
  }

  async getUserProfile(query: Types.ObjectId) {
    const user = await this.AuthSchema.findById(query)

    return user;
  }

  async findOne(query: any) {
    return this.AuthSchema.findOne(query);
  }
  // async createAdmin(data: Record<string, any>) {
  //   const user = await this.UserSchema.create(data);
  //   return user;
  // }

  // async updateOne(query: any, data: Record<string, any>) {
  //   return await this.UserSchema.findOneAndUpdate(query, data, { new: true });
  // }

  // async findById(id: string) {
  //   return await this.UserSchema.findById({ _id: id });
  // }

  // async getAllUsers() {
  //   const users = await this.UserSchema.find({ role: 'user' })
  //     .populate([{ path: 'profile' }])
  //     .exec();
  //   return users;
  // }

  // async getUserProfile() {
  //   const users = await this;
  // }
}
