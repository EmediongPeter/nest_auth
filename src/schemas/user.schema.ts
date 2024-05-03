import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export enum userTypes {
  USER = 'user',
  ADMIN = 'admin',
}

export type TalentDocument = HydratedDocument<Talent>;
export type RecruiterDocument = HydratedDocument<Recruiter>;

@Schema({ timestamps: true })
export class Talent {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  gender: string;
}

@Schema({ timestamps: true })
export class Recruiter {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  website: string;

  @Prop({ type: String })
  company: string;
}

export const TalentSchema = SchemaFactory.createForClass(Talent);
export const RecruiterSchema = SchemaFactory.createForClass(Recruiter);
