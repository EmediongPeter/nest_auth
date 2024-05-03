import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export enum AuthenticationTypes {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export type AuthenticationDocument = HydratedDocument<Authentication>;

@Schema({ timestamps: true })
export class Authentication {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({
    type: String,
    enum: AuthenticationTypes,
    default: AuthenticationTypes.USER,
  })
  role: string;

  @Prop({ type: String, default: '' })
  password: string;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  profile: string;
}

export const AuthenticationSchema =
  SchemaFactory.createForClass(Authentication);
