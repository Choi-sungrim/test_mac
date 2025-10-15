import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop()
  board_num: number;
  @Prop()
  content: string;
  @Prop()
  title: string;
  @Prop()
  create_by?: string;
  @Prop({ required: false })
  modify_by?: string;
  @Prop({ default: Date.now })
  create_at?: Date;
  @Prop({ required: false })
  modify_at?: Date;
}
export const BoardSchema = SchemaFactory.createForClass(Board);
