import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true }) name: string;
  @Prop({ type: Types.ObjectId, required: true }) ownerId: Types.ObjectId;
}
export type ProjectDocument = HydratedDocument<Project>;
export const ProjectSchema = SchemaFactory.createForClass(Project);
