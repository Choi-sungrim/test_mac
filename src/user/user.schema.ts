import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  password: string;
  @Prop()
  role_number: number;
  @Prop()
  class: number;
  @Prop()
  gender: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
