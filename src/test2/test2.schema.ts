import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * 별개의 schema를 하나의 application에서 연결하기위한 schema 객체
 */
@Schema()
export class Test2 {
  @Prop()
  creator: string;
  @Prop()
  comment: string;
  @Prop()
  board_num: number;
  @Prop()
  create_at: Date;
  @Prop()
  modify_at: Date;
}
export const Test2Schema = SchemaFactory.createForClass(Test2);
