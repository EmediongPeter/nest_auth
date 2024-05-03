import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from 'src/repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileSchema, UserProfile, Talent, TalentSchema, Recruiter, RecruiterSchema, Authentication, AuthenticationSchema } from 'src/schemas';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Authentication.name, schema: AuthenticationSchema },
      { name: Talent.name, schema: TalentSchema },
      { name: Recruiter.name, schema: RecruiterSchema },
      { name: UserProfile.name, schema: UserProfileSchema },
    ]),
  ],
  controllers: [UsersController, AdminController],
  providers: [UsersService, UserRepository],
  // exports: [UsersService, UserRepository],
})
export class UsersModule {}
