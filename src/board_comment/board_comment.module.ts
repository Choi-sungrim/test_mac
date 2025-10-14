import { Module } from '@nestjs/common';
import { BoardCommentService } from './board_comment.service';
import { BoardCommentController } from './board_comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardComment, BoardCommentSchema } from './board_comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BoardComment.name,
        schema: BoardCommentSchema,
      },
    ]),
  ],
  providers: [BoardCommentService],
  controllers: [BoardCommentController],
  exports: [BoardCommentService],
})
export class BoardCommentModule {}
