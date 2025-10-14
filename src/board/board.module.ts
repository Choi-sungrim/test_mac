import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './board.schema';
import { BoardCommentService } from 'src/board_comment/board_comment.service';
import {
  BoardComment,
  BoardCommentSchema,
} from 'src/board_comment/board_comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Board.name,
        schema: BoardSchema,
      },
      { name: BoardComment.name, schema: BoardCommentSchema },
    ]),
  ],
  providers: [BoardService, BoardCommentService],
  controllers: [BoardController],
})
export class BoardModule {}
