import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { UserProfile, UserProfileDocument } from 'src/schemas';
import { Authentication, AuthenticationDocument } from 'src/schemas/auth.schema';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(Authentication.name)
    private readonly AuthSchema: Model<AuthenticationDocument>,
  ) {}

  async createUser(data: Record<string, any>) {
    const user = await this.AuthSchema.create(data);
    return user;
  }

  async findOne(query: any) {
    return this.AuthSchema.findOne(query);
  }
}