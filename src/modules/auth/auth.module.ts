/** Package modules */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

/** */
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/repositories';
import {
  UserProfileSchema,
  UserProfile,
  RefreshToken,
  RefreshTokenSchema,
  Talent,
  TalentSchema,
  Recruiter,
  RecruiterSchema,
} from 'src/schemas';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { AdminController } from './admin.controller';
import { AuthRepository } from 'src/repositories/auth.repository';
import { Authentication, AuthenticationSchema } from 'src/schemas/auth.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    MongooseModule.forFeature([
      { name: Authentication.name, schema: AuthenticationSchema },
      { name: Talent.name, schema: TalentSchema },
      { name: Recruiter.name, schema: RecruiterSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    PassportModule,
  ],
  controllers: [AuthController, AdminController],
  providers: [
    AuthService,
    AuthRepository,
    UserRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
