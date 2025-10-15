import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, BoardDocument } from './board.schema';
import { BoardComment } from 'src/board_comment/board_comment.schema';
import { BoardBaseDTO, CreateBoardDTO, UpdateBoardDTO } from './board.dto';
import { handleDatabaseError } from 'src/utils/common/commonException';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(BoardComment.name)
    private boardCommentModel: Model<BoardComment>,
  ) {}

  async createBoard(
    createBoardDto: CreateBoardDTO,
    userId: string,
  ): Promise<CreateBoardDTO> {
    const createdBoard = new this.boardModel({
      ...createBoardDto,
      create_by: userId,
      create_at: new Date(),
    });
    const boardNum = createdBoard.board_num;

    try {
      const existBoard = await this.boardModel.find({
        board_num: boardNum,
      });
      if (existBoard.length) {
        throw new NotFoundException(`Board #${boardNum} already exist`);
      }

      return (await createdBoard.save()).toObject() as CreateBoardDTO;
    } catch (error) {
      const message = `게시글 생성에 실패했습니다. 데이터 처리 중 서버 오류가 발생했습니다.${error}`;
      handleDatabaseError(error, message);
    }
  }

  async updateBoard(
    boardNum: string,
    updateBoardDto: UpdateBoardDTO,
    userId: string,
  ): Promise<UpdateBoardDTO> {
    const updateData: Partial<Board> = {
      ...updateBoardDto,
      modify_by: userId,
      modify_at: new Date(),
    };
    try {
      const updatedBoard = await this.boardModel
        .findOneAndUpdate({ board_num: boardNum }, updateData, {
          new: true,
        })
        .exec();

      if (!updatedBoard) {
        throw new NotFoundException(`Board #${boardNum} not found.`);
      }

      return updatedBoard.toObject() as UpdateBoardDTO;
    } catch (error) {
      const message = `게시글 수정에 실패했습니다. 데이터 처리 중 서버 오류가 발생했습니다.${error}`;
      handleDatabaseError(error, message);
    }
  }

  async getAllBoards(): Promise<BoardBaseDTO[]> {
    try {
      const BoardData = await this.boardModel.find().exec();
      if (!BoardData || BoardData.length == 0) {
        throw new NotFoundException('Board data not found!');
      }
      return BoardData;
    } catch (error) {
      const message = `전체 게시글 조회에 실패했습니다. 데이터 처리 중 서버 오류가 발생했습니다.${error}`;
      handleDatabaseError(error, message);
    }
  }
  async getBoard(boardNum: number): Promise<BoardBaseDTO> {
    try {
      const existingBoard = await this.boardModel
        .findOne({ board_num: boardNum })
        .exec();
      if (!existingBoard) {
        throw new NotFoundException(`Board #${boardNum} not found`);
      }
      return existingBoard;
    } catch (error) {
      const message = `해당 게시글 조회에 실패했습니다. 데이터 처리 중 서버 오류가 발생했습니다.${error}`;
      handleDatabaseError(error, message);
    }
  }
  async deleteBoard(boardNum: number): Promise<BoardDocument> {
    try {
      const deletedBoard = await this.boardModel.findOneAndDelete({
        board_num: boardNum,
      });
      if (!deletedBoard) {
        throw new NotFoundException(`Board #${boardNum} not found`);
      }
      const existBoardComment = await this.boardCommentModel.find({
        board_num: deletedBoard.board_num,
      });
      if (existBoardComment) {
        await this.boardCommentModel.deleteMany({
          board_num: deletedBoard.board_num,
        });
      }
      return deletedBoard;
    } catch (error) {
      const message = `게시글 삭제에 실패했습니다. 데이터 처리 중 서버 오류가 발생했습니다.${error}`;
      handleDatabaseError(error, message);
    }
  }
}
