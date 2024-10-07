import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  CreateUserDTO,
  EntriesDto,
  TalentsDto,
} from './dto/create-user.dto';
import { Model, Types } from 'mongoose';
import { Entries, EntriesDocument, Talent, TalentDocument, User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userSchema: Model<UserDocument>,
    @InjectModel(Entries.name)
    private readonly entriesSchema: Model<EntriesDocument>,
    @InjectModel(Talent.name)
    private readonly talentsSchema: Model<TalentDocument>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const user = new this.userSchema();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;

    const salt = await bcrypt.genSalt(); // 2.
    user.password = await bcrypt.hash(userDTO.password, salt); // 3.

    const savedUser = await this.userSchema.create(user);
    delete savedUser.password;
    return savedUser;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userSchema.findOne({ email });
    // if (!user) {
    //   throw new UnauthorizedException('Could not find user');
    // }
    return user;
  }

  async findEntries(): Promise<Entries[]> {
    const entries = await this.entriesSchema.find();

    return entries;
  }

  async findTalents(): Promise<Talent[]> {
    const talents = await this.talentsSchema.find();

    return talents;
  }

  async entries(entriesDto: EntriesDto): Promise<Entries> {
    const entry = await this.entriesSchema.create(entriesDto);
    return entry;
  }

  async talents(talentsDto: TalentsDto): Promise<Talent> {
    const talent = await this.talentsSchema.create(talentsDto);

    return talent;
  }
}
