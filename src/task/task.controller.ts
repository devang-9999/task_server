/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Response } from 'express';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Res() res:Response) {
  
    try {
        console.log(createTaskDto);
      const response= this.taskService.create(createTaskDto);
      res.status(HttpStatus.OK).json({
        message:response,
      })
    } catch (error) {
      console.log(error)
      res.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
      })
      throw new Error('Task already exists');
    }
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id/mark-in-pending')
  updateTopending(@Param('id') id: string) {
    return this.taskService.updateTopending(+id);
  }
  @Patch(':id/mark-completed')
  updateTocompleted(@Param('id') id: string) {
    return this.taskService.updateTocompleted(+id);
  }
  @Patch(':id/mark-in-process')
  updateToInprocess(@Param('id') id: string) {
    return this.taskService.updateToInprocess(+id);
  }

  @Patch('/subtask/:id/mark-in-pending')
  updateTopendingSubtask(@Param('id') id: string) {
    return this.taskService.updateTopendingSubtask(+id);
  }
  @Patch('/subtask/:id/mark-completed')
  updateTocompletedSubtask(@Param('id') id: string) {
    return this.taskService.updateTocompletedSubtask(+id);
  }
  @Patch('/subtask/:id/mark-in-process')
  updateToInprocessSubtask(@Param('id') id: number) {
    return this.taskService.updateToInprocessSubtask(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);
    return this.taskService.update(+id, updateTaskDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
