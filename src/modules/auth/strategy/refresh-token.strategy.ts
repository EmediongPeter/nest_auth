import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { RefreshTokenPayload } from '../types/refresh-token-payload';
import { RefreshTokenContent } from '../types/refresh-token-content';
import { refreshJwtConfig } from 'src/config/jwt.config';

type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: refreshJwtConfig.secret,
      passReqToCallback: true,
    });
  }

  /** Validates and returns data after JsonWebToken is decrypted */
  async validate(
    req: Request,
    payload: RefreshTokenPayload,
  ): Promise<RefreshTokenContent> {
    const refreshToken = req.body
    
    return {
      userId: payload.sub,
      refreshToken,
    };
  } 
}
