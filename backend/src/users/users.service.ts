import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private users: Model<UserDocument>) {}

  findAll() {
    return this.users.find().exec();
  }

  findOne(id: string) {
    return this.users.findById(id).exec();
  }

  update(id: string, body: any) {
    return this.users.findByIdAndUpdate(id, body, { new: true }).exec();
  }
}
