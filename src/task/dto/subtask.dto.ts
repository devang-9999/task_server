import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubTaskDto {
  @IsNumber({}, { message: 'id must be a number' })
  @IsOptional()
  sid: number;

  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsNumber({}, { message: 'task must be a string' })
  @IsOptional({ message: 'task id cannot be empty' })
  taskid: number;

  @IsString({ message: 'status must be a string' })
  @IsOptional()
  status: string;
}
