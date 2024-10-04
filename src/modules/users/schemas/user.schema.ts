import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export enum userTypes {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserDocument = HydratedDocument<User>;
export type EntriesDocument = HydratedDocument<Entries>;
export type TalentDocument = HydratedDocument<Talent>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;
  id: any;
}

@Schema({ timestamps: true })
export class Entries {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  gender: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  skill: string;

  @Prop({ type: String, required: true })
  state: string;
  
  @Prop({ type: String, required: true })
  locality: string;

  @Prop({ type: String, required: true })
  ageRange: string;

  @Prop({ type: String, required: true })
  discoveryMethod: string
}

@Schema({ timestamps: true })
export class Talent {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  locality: string;

  @Prop({ type: String, required: true })
  gender: string;

  @Prop({ type: String, required: true })
  skill: string;

  @Prop({ type: String, required: true })
  experience: string;

  @Prop({ type: String, required: true })
  availability: string;

  @Prop({ type: String, required: true })
  smLink: string;

  @Prop({ type: String, required: true })
  resume: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const EntriesSchema = SchemaFactory.createForClass(Entries);
export const TalentSchema = SchemaFactory.createForClass(Talent);
