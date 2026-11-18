import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true }) title: string;
  @Prop() description?: string;
  @Prop({ default: 'TODO' }) status: string;
  @Prop({ type: Types.ObjectId, required: true }) ownerId: Types.ObjectId;
  @Prop({ type: Types.ObjectId }) projectId?: Types.ObjectId;
}
export type TaskDocument = HydratedDocument<Task>;
export const TaskSchema = SchemaFactory.createForClass(Task);
