import { HttpStatus } from '@nestjs/common';
import { AuthServiceInputException } from './auth-service-input.exception';

/** Used when the user inputs the wrong email
 * or password when trying to login
 */
export class InvalidEmailOrPasswordException extends AuthServiceInputException {
  /** Throws exception with message 'Invalid email or password'.
   *
   * Used when the user inputs the wrong email
   * or password when trying to login
   */
  constructor(message?: string) {
    super(message || 'Invalid email or password', HttpStatus.BAD_REQUEST);
  }
}
