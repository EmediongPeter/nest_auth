import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  Document,
  Types,
  Schema as MongooseSchema,
} from 'mongoose';

@Schema({ timestamps: true })
export class Profile {
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  // userId: User;

  @Prop({ type: String })
  dob: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: String })
  address: string;
}

export type ProfileDocument = HydratedDocument<Profile>;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
