import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardComment } from './board_comment.schema';

@Injectable()
export class BoardCommentService {
  constructor(
    @InjectModel(BoardComment.name)
    private boardCommentModel: Model<BoardComment>,
  ) {}

  async createBoardComments(
    createBoardCommentsDto: BoardComment,
  ): Promise<BoardComment> {
    const newBoardComments = new this.boardCommentModel({
      ...createBoardCommentsDto,
      create_at: new Date(),
    });
    return await newBoardComments.save();
  }
  async updateBoardComments(
    _id: string,
    updateBoardCommentsDto: BoardComment,
    userName: string,
  ): Promise<BoardComment> {
    const existingBoardComments =
      await this.boardCommentModel.findByIdAndUpdate(
        _id,
        {
          ...updateBoardCommentsDto,
          modify_by: userName,
          modify_at: new Date(),
        },
        { new: true },
      );
    if (!existingBoardComments) {
      throw new NotFoundException(`BoardComments #${_id} not found`);
    }
    return existingBoardComments;
  }
  async getAllBoardComments(): Promise<BoardComment[]> {
    const BoardCommentsData = await this.boardCommentModel.find();
    if (!BoardCommentsData || BoardCommentsData.length == 0) {
      throw new NotFoundException('BoardComments data not found!');
    }
    return BoardCommentsData;
  }
  async getBoardComments(BoardNum: number): Promise<BoardComment[]> {
    const existingBoardComments = await this.boardCommentModel
      .find({
        BoardNum: BoardNum,
      })
      .exec();
    if (!existingBoardComments) {
      throw new NotFoundException(`BoardComments #${BoardNum} not found`);
    }
    return existingBoardComments;
  }
  async deleteBoardComments(_id: string): Promise<BoardComment> {
    const deletedBoardComments = await this.boardCommentModel.findOneAndDelete({
      _id: _id,
    });
    if (!deletedBoardComments) {
      throw new NotFoundException(`BoardComments #${_id} not found`);
    }
    return deletedBoardComments;
  }
}
