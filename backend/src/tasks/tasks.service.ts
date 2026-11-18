import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './tasks.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private tasks: Model<TaskDocument>) {}

  findAll(query: any) {
    return this.tasks.find(query).exec();
  }

  findOne(id: string) {
    return this.tasks.findById(id).exec();
  }

  create(body: any) {
    return this.tasks.create(body);
  }

  update(id: string, body: any) {
    return this.tasks.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  remove(id: string) {
    return this.tasks.findByIdAndDelete(id).exec();
  }
}
