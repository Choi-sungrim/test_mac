import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BoardComment {
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
export const BoardCommentSchema = SchemaFactory.createForClass(BoardComment);
