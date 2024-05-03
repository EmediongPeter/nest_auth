import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { accessJwtConfig } from 'src/config/jwt.config';
import { AccessTokenContent } from '../types/access-token-content';
import { AccessTokenPayload } from '../types/access-token-payload';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessJwtConfig.secret,
    });
  }

  /** Validates and returns data after JsonWebToken is decrypted */
  async validate(payload: AccessTokenPayload): Promise<AccessTokenContent> {
    
    return {
      userId: payload.sub,
      userRole: payload.role,
    };
  }
}
