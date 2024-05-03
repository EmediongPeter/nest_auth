import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { RegisterCredentialsDto } from './dto/auth-credentials.dto';
// import { UserDocument, userTypes } from 'src/schemas';
import { IAuthUser, LoginResponse } from './types/auth.types';
import { accessJwtConfig, refreshJwtConfig } from 'src/config/jwt.config';
import { getTokenExpirationDate } from 'src/utils/getTokenExpiration';
import {
  RefreshToken,
  RefreshTokenDocument,
} from 'src/schemas/refreshtoken.schema';
import { hashConfig } from 'src/config/hash.config';
import { RefreshTokenPayload } from './types/refresh-token-payload';
import { InvalidEmailOrPasswordException } from 'src/common/exceptions/forbidden.exception';
import { InvalidRefreshTokenException } from 'src/common/exceptions/invalid-refresh-token.exception';
import { AuthRepository, UserRepository } from 'src/repositories';
import {
  Authentication,
  AuthenticationDocument,
  AuthenticationSchema,
} from 'src/schemas/auth.schema';

/** Responsible for authenticating the user */
@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository) private readonly authRepo: AuthRepository,
    @Inject(UserRepository) private readonly userRepo: UserRepository,
    private jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenSchema: Model<RefreshTokenDocument>,
    @InjectModel(Authentication.name)
    private readonly AuthenticationSchema: Model<AuthenticationDocument>,
  ) {}

  async checkEmail(email: string) {
    const foundUser = await this.authRepo.findOne({ email });
    if (foundUser && foundUser.password) {
      return;
    }

    return 'Email registered. Please create a password for yourself';
  }

  async register(registerUserDto: RegisterCredentialsDto) {
    const { email, password } = registerUserDto;

    const foundUser = await this.authRepo.findOne({ email });
    if (foundUser && foundUser.password) {
      throw new InvalidEmailOrPasswordException('Invalid credentials');
    }

    const hashedPassword = await this.generateHashPassword(password);
    registerUserDto.password = hashedPassword;

    const user = await this.userRepo.authUser({ ...registerUserDto });

    const payload = { sub: user._id.toString(), role: user.role };
console.log(user._id.toString());
    const accessToken = await this.generateAccessToken(payload);

    const refreshToken = await this.createRefreshToken(payload);

    delete user.password;

    return this.authResponseInterface({ user, accessToken, refreshToken });
  }

  /** Validates if the inputted email exists and
   * compares if the hashed password matches the inputted one.
   *
   * If so, returns the access and refresh JWTs
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.validateUser(email, password);

    const payload = { sub: user.id, role: user.role };

    const accessToken = await this.generateAccessToken(payload);

    const refreshToken = await this.createRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  }

  /** Deletes the refreshToken from the database*/
  async logout(refreshToken: string): Promise<void> {
    await this.validateRefreshToken(refreshToken);

    await this.refreshTokenSchema.deleteMany({ refreshToken });
  }

  /** Refreshes and rotates user's access and refresh tokens */
  // async refreshToken(refreshToken: string): Promise<LoginResponse> {
  //   const refreshTokenContent = await this.validateRefreshToken(refreshToken);

  //   const foundUser = await this.userRepo.findOne({
  //     _id: refreshTokenContent.sub,
  //   });

  //   const payload = { sub: foundUser._id.toString(), role: foundUser.role };

  //   const accessToken = await this.generateAccessToken(payload);

  //   const newRefreshToken = await this.rotateRefreshToken(
  //     refreshToken,
  //     refreshTokenContent,
  //   );

  //   return {
  //     accessToken,
  //     refreshToken: newRefreshToken,
  //   };
  // }

  /** Send forgot password email to the user */
  async forgotPassword() {}

  /** Deletes all user's refresh tokens */
  async logoutAll(userId: string): Promise<void> {
    await this.refreshTokenSchema.deleteMany({ userId });
  }

  /** Returns all user's active tokens */
  async findAllTokens(userId: string): Promise<RefreshToken[]> {
    const tokens = await this.refreshTokenSchema.find({ _id: userId });

    return tokens;
  }

  /** Validates if the inputted email exists and
   * compares if the hashed password matches the inputted one.
   *
   * If not, throws an error
   */
  private async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticationDocument> {
    const user = await this.userRepo.findOne({ email });

    if (user) {
      const isPasswordValid = await this.comparePassword(
        password,
        user.password,
      );

      if (isPasswordValid) {
        user.password = undefined;
        return user;
      }
    }

    throw new InvalidEmailOrPasswordException();
  }

  /** Generates user's access token */
  private async generateAccessToken(payload: {
    sub: string;
    role: string;
  }): Promise<string> {
    const accessToken = await this.jwtService.signAsync(payload, {
      ...accessJwtConfig,
    });

    return accessToken;
  }

  /** Creates the refresh token and saves it in the database */
  private async createRefreshToken(payload: { sub: string }): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      { ...payload },
      { ...refreshJwtConfig },
    );

    await this.saveRefreshToken({
      userId: payload.sub,
      refreshToken,
    });

    return refreshToken;
  }

  /** Saves the new refresh token hashed in the database */
  private async saveRefreshToken(refreshTokenCredentials: {
    userId: string;
    refreshToken: string;
  }): Promise<void> {
    const expiresAt = getTokenExpirationDate();

    const storedRefreshToken = await this.refreshTokenSchema.findOne({
      userId: refreshTokenCredentials.userId,
    });

    if (storedRefreshToken) {
      await this.refreshTokenSchema.deleteMany({
        userId: refreshTokenCredentials.userId,
      });
    }

    await this.refreshTokenSchema.create({
      ...refreshTokenCredentials,
      expiresAt,
    });
  }

  /** Checks if the refresh token is valid */
  private async validateRefreshToken(refreshToken: string): Promise<any> {
    const refreshTokenContent = this.jwtService.decode(refreshToken);

    const userTokens = await this.refreshTokenSchema.find({
      userId: refreshTokenContent.sub,
      refreshToken,
    });

    const isRefreshTokenValid = userTokens.length > 0;

    if (!isRefreshTokenValid) {
      await this.removeRefreshTokenFamilyIfCompromised(refreshTokenContent.sub);
      throw new InvalidRefreshTokenException();
    }

    return refreshTokenContent;
  }

  /** Removes a compromised refresh token family from the database */
  private async removeRefreshTokenFamilyIfCompromised(
    userId: string,
  ): Promise<void> {
    const hackedUserTokens = await this.refreshTokenSchema.find({
      userId,
    });

    if (hackedUserTokens.length > 0) {
      await this.refreshTokenSchema.deleteMany({
        userId,
      });
    }
  }

  /** Removes the old token from the database and creates a new one */
  private async rotateRefreshToken(
    refreshToken: string,
    refreshTokenContent: RefreshTokenPayload,
  ): Promise<string> {
    await this.refreshTokenSchema.deleteMany({ refreshToken });

    const newRefreshToken = await this.createRefreshToken({
      sub: refreshTokenContent.sub,
    });

    return newRefreshToken;
  }

  private async generateHashPassword(data: string): Promise<string> {
    return await bcrypt.hash(data, hashConfig.saltRounds);
  }

  private async comparePassword(
    data: string,
    hashedData: string,
  ): Promise<boolean> {
    return await bcrypt.compare(data, hashedData);
  }

  /* Auth Response Interface */
  private authResponseInterface(responseObject: {
    user: AuthenticationDocument;
    accessToken: string;
    refreshToken: string;
  }): IAuthUser {
    const { user, accessToken, refreshToken } = responseObject;

    const authUser = {
      id: user._id,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    };

    return authUser;
  }
}
