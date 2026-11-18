import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './projects.schema';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projects: Model<ProjectDocument>) {}
  findAll() { return this.projects.find().exec(); }
  create(body: any) { return this.projects.create(body); }
  remove(id: string) { return this.projects.findByIdAndDelete(id).exec(); }
}
