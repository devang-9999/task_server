import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  uid: string;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Task);
