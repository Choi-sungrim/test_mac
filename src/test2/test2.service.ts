import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test2 } from './test2.schema';

@Injectable()
export class Test2Service {
  constructor(
    @InjectModel(Test2.name, 'test_mac_2') private test2Model: Model<Test2>,
  ) {}

  async createTest2(createTest2Dto: Test2): Promise<Test2> {
    const newTest2 = new this.test2Model(createTest2Dto);
    return await newTest2.save();
  }
  async updateTest2(_id: string, updateTest2Dto: Test2): Promise<Test2> {
    const existingTest2 = await this.test2Model.findByIdAndUpdate(
      _id,
      updateTest2Dto,
      { new: true },
    );
    if (!existingTest2) {
      throw new NotFoundException(`Test2 #${_id} not found`);
    }
    return existingTest2;
  }
  async getAllTest2(): Promise<Test2[]> {
    const Test2Data = await this.test2Model.find();
    if (!Test2Data || Test2Data.length == 0) {
      throw new NotFoundException('Test2 data not found!');
    }
    return Test2Data;
  }
  async getTest2(BoardNum: number): Promise<Test2[]> {
    const existingTest2 = await this.test2Model
      .find({ BoardNum: BoardNum })
      .exec();
    if (!existingTest2) {
      throw new NotFoundException(`Test2 #${BoardNum} not found`);
    }
    return existingTest2;
  }
  async deleteTest2(_id: string): Promise<Test2> {
    const deletedTest2 = await this.test2Model.findOneAndDelete({ _id: _id });
    if (!deletedTest2) {
      throw new NotFoundException(`Test2 #${_id} not found`);
    }
    return deletedTest2;
  }
}
