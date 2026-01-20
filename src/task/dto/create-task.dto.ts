import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SubTaskDto } from './subtask.dto';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsNumber({}, { message: 'id must be a number' })
  @IsOptional()
  id: number;

  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsString({ message: 'user must be a string' })
  @IsNotEmpty({ message: 'user cannot be empty' })
  uid: string;

  @IsString({ message: 'user must be a string' })
  @IsOptional()
  status: string;

  @IsString({ message: 'user must be a string' })
  @IsNotEmpty()
  startTime: string;

  @IsString({ message: 'user must be a string' })
  @IsNotEmpty()
  deadline: string;

  // @Transform(() => Date)
  // @IsNotEmpty()
  // startTime: Date;

  //  @Transform(() => Date)
  // @IsNotEmpty()
  // deadline: Date;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => SubTaskDto)
  subtasks: SubTaskDto[];
}
