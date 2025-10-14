import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, BoardDocument } from './board.schema';
import { BoardComment } from 'src/board_comment/board_comment.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(BoardComment.name)
    private boardCommentModel: Model<BoardComment>,
  ) {}

  async createBoard(createBoardDto: Board, userName: string): Promise<Board> {
    const newBoard = new this.boardModel({
      ...createBoardDto,
      creator: userName,
      create_by: userName,
      create_at: new Date(),
    });
    return await newBoard.save();
  }

  async updateBoard(
    _id: string,
    updateBoardDto: Partial<Board>,
    userName: string,
  ): Promise<Board> {
    const updateData: Partial<Board> = {
      ...updateBoardDto,
      modify_by: userName,
      modify_at: new Date(),
    };

    const existingBoard = await this.boardModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true },
    );

    if (!existingBoard) {
      throw new NotFoundException(`Board #${_id} not found`);
    }
    return existingBoard;
  }

  async getAllBoards(): Promise<BoardDocument[]> {
    const BoardData = await this.boardModel.find().exec();
    if (!BoardData || BoardData.length == 0) {
      throw new NotFoundException('Board data not found!');
    }
    return BoardData;
  }
  async getBoard(BoardNum: number): Promise<BoardDocument> {
    const existingBoard = await this.boardModel
      .findOne({ boardNum: BoardNum })
      .exec();
    if (!existingBoard) {
      throw new NotFoundException(`Board #${BoardNum} not found`);
    }
    return existingBoard;
  }
  async deleteBoard(_id: string): Promise<BoardDocument> {
    const deletedBoard = await this.boardModel.findOneAndDelete({ _id: _id });
    if (!deletedBoard) {
      throw new NotFoundException(`Board #${_id} not found`);
    }
    const existBoardComment = await this.boardCommentModel.find({
      boardNum: deletedBoard.board_num,
    });
    if (existBoardComment) {
      await this.boardCommentModel.deleteMany({
        boardNum: deletedBoard.board_num,
      });
    }
    return deletedBoard;
  }
}
