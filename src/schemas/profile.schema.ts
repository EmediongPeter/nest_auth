import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
// import { User } from './user.schema';

export type UserProfileDocument = HydratedDocument<UserProfile>;

@Schema({ timestamps: true })
export class UserProfile {
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: "users", required: true })
  // userId: User;
  
  @Prop({ type: String })
  specialty: string;

  @Prop({ type: String })
  experience: string;

  @Prop({ type: String })
  availability: string;

  @Prop({ type: String })
  website: string;

  @Prop({ type: String })
  linkedIn: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
