import { Types } from 'mongoose';
export interface IAuthUser {
  accessToken: string;
  refreshToken: string;
  email: string;
  role: string;
  id: Types.ObjectId;
}

export interface LoginResponse {
  accessToken: string;
}
