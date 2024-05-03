import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
} from 'mongoose';

@Schema({ timestamps: true })
export class AdminPasscode {
  @Prop({ type: String, required: true })
  passcode: string;

  @Prop({ type: Number, max: 2 })
  limit: number;
}

export type AdminPasscodeDocument = HydratedDocument<AdminPasscode>;
export const AdminPasscodeSchema = SchemaFactory.createForClass(AdminPasscode);
