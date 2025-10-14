import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(createUserDto: User): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }
  async updateUser(_id: string, updateUserDto: User): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      _id,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${_id} not found`);
    }
    return existingUser;
  }
  async getAllUsers(): Promise<User[]> {
    const UserData = await this.userModel.find();
    if (!UserData || UserData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return UserData;
  }
  async getUser(userName: string): Promise<User> {
    const existingUser = await this.userModel.findById(userName).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${userName} not found`);
    }
    return existingUser;
  }
  async deleteUser(_id: string): Promise<User> {
    const deletedUser = await this.userModel.findOneAndDelete({ _id: _id });
    if (!deletedUser) {
      throw new NotFoundException(`User #${_id} not found`);
    }
    return deletedUser;
  }
}
