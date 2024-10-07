import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { IAuthUser, LoginResponse } from './types/auth.types';
import { accessJwtConfig, refreshJwtConfig } from 'src/config/jwt.config';
import { hashConfig } from 'src/config/hash.config';
import { InvalidEmailOrPasswordException } from 'src/common/exceptions/forbidden.exception';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';

/** Responsible for authenticating the user */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,

    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDTO) {
    const { email } = createUserDto;

    const foundUser = await this.userService.findOne(email);
    if (foundUser && foundUser.password) {
      throw new InvalidEmailOrPasswordException('Invalid credentials');
    }

    const user = await this.userService.create(createUserDto);

    const payload = { sub: user.id.toString(), email: user.email };
    const accessToken = await this.generateAccessToken(payload);

    return { user, accessToken };
  }

  /** Validates if the inputted email exists and
   * compares if the hashed password matches the inputted one.
   *
   * If so, returns the access and refresh JWTs
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.validateUser(email, password);

    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.generateAccessToken(payload);

    return {
      accessToken,
    };
  }

  /** Deletes the refreshToken from the database*/
  async logout(refreshToken: string): Promise<void> {
    
  }

  /** Validates if the inputted email exists and
   * compares if the hashed password matches the inputted one.
   *
   * If not, throws an error
   */
  private async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

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
    email: string;
  }): Promise<string> {
    const accessToken = await this.jwtService.signAsync(payload, {
      ...accessJwtConfig,
    });

    return accessToken;
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
}
