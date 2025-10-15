import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardComment } from './board_comment.schema';
import { BoardCommentBaseDTO } from './board_comment.dto';
import { handleDatabaseError } from 'src/utils/common/commonException';

@Injectable()
export class BoardCommentService {
  constructor(
    @InjectModel(BoardComment.name)
    private boardCommentModel: Model<BoardComment>,
  ) {}

  async createBoardComments(
    createBoardCommentsDto: BoardCommentBaseDTO,
    userId: string,
  ): Promise<BoardComment> {
    const newBoardComments = new this.boardCommentModel({
      ...createBoardCommentsDto,
      create_by: userId,
      create_at: new Date(),
    });
    try {
      return await newBoardComments.save();
    } catch (error) {
      const message = `게시글 댓글 생성에 실패했습니다. 데이터 처리 중 서버 오류가 발생했습니다.${error}`;
      handleDatabaseError(error, message);
    }
  }
  async updateBoardComments(
    _id: string,
    updateBoardCommentsDto: BoardComment,
    userId: string,
  ): Promise<BoardComment> {
    try {
      const existingBoardComments =
        await this.boardCommentModel.findByIdAndUpdate(
          _id,
          {
            ...updateBoardCommentsDto,
            modify_by: userId,
            modify_at: new Date(),
          },
          { new: true },
        );
      if (!existingBoardComments) {
        throw new NotFoundException(`BoardComments #${_id} not found`);
      }
      return existingBoardComments;
    } catch (error) {
      const message = `게시글 댓글 수정에 실패했습니다. 데이터 처리 중 서버 오류가 발생했습니다.${error}`;
      handleDatabaseError(error, message);
    }
  }
  async getAllBoardComments(): Promise<BoardComment[]> {
    try {
      const BoardCommentsData = await this.boardCommentModel.find();
      if (!BoardCommentsData || BoardCommentsData.length == 0) {
        throw new NotFoundException('BoardComments data not found!');
      }
      return BoardCommentsData;
    } catch (error) {
      const message = `전체 게시글 댓글 조회에 실패했습니다. 데이터 처리 중 서버 오류가 발생했습니다.${error}`;
      handleDatabaseError(error, message);
    }
  }
  async getBoardComments(BoardNum: number): Promise<BoardComment[]> {
    try {
      const existingBoardComments = await this.boardCommentModel
        .find({
          BoardNum: BoardNum,
        })
        .exec();
      if (!existingBoardComments) {
        throw new NotFoundException(`BoardComments #${BoardNum} not found`);
      }
      return existingBoardComments;
    } catch (error) {
      const message = `해당 게시글의 댓글 조회에 실패했습니다. 데이터 처리 중 서버 오류가 발생했습니다.${error}`;
      handleDatabaseError(error, message);
    }
  }
  async deleteBoardComments(_id: string): Promise<BoardComment> {
    try {
      const deletedBoardComments =
        await this.boardCommentModel.findOneAndDelete({
          _id: _id,
        });
      if (!deletedBoardComments) {
        throw new NotFoundException(`BoardComments #${_id} not found`);
      }
      return deletedBoardComments;
    } catch (error) {
      const message = `해당 게시글의 댓글 조회에 실패했습니다. 데이터 처리 중 서버 오류가 발생했습니다.${error}`;
      handleDatabaseError(error, message);
    }
  }
}
