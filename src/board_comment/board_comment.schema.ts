import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BoardComment {
  @Prop()
  comment: string;
  @Prop()
  board_num: number;
  @Prop()
  create_by?: string;
  @Prop({ default: Date.now })
  create_at?: Date;
  @Prop({ required: false })
  modify_by?: string;
  @Prop({ required: false })
  modify_at?: Date;
}
export const BoardCommentSchema = SchemaFactory.createForClass(BoardComment);
