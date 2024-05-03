import { HttpStatus } from '@nestjs/common';
import { AuthServiceInputException } from './auth-service-input.exception';

export class InvalidRefreshTokenException extends AuthServiceInputException {
  constructor() {
    super('Invalid refresh token', HttpStatus.UNAUTHORIZED);
  }
}
