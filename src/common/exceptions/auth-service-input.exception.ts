import { HttpException } from '@nestjs/common';

export class AuthServiceInputException extends HttpException {
  constructor(message: string, statusCode) {
    super(message, statusCode)
  }

  
}
