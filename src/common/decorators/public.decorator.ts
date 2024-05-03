import { CustomDecorator, SetMetadata } from '@nestjs/common';

/** Value to verify if @Public() is being used in the endpoint*/
export const IS_PUBLIC_KEY = 'isPublic';

/** Makes an endpoint accessible by unauthenticated users*/
export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);
