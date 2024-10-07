import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from 'src/repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { Entries, EntriesSchema, Talent, TalentSchema, User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Talent.name, schema: TalentSchema },
      { name: Entries.name, schema: EntriesSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
