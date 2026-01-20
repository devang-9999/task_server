/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { tasks } from './constants/tasks';
import { subtasks } from './constants/subatasks';

@Injectable()
export class TaskService {


  create(createTaskDto: CreateTaskDto) {
    const { title, uid, subtasks: dtoSubtasks, startTime, deadline } =
      createTaskDto;

    const existing = tasks.find(
      (t) => t.title.toLowerCase() === title.toLowerCase(),
    );
    if (existing) {
      throw new BadRequestException('TASK TITLE ALREADY EXISTS');
    }

    const taskId = Date.now();

    const newTask = {
      id: taskId,
      uid,
      title,
      status: 'pending',
      startTime,
      deadline,
    };

    tasks.push(newTask);

    if (dtoSubtasks && dtoSubtasks.length > 0) {
      dtoSubtasks.forEach((s) => {
        subtasks.push({
          sid: Date.now(),
          taskid: taskId,
          title: s.title,
          status: 'pending',
        });
      });
    }

    return newTask;
  }


  findAll() {
    return tasks.map((task) => ({
      ...task,
      subtasks: subtasks.filter((s) => s.taskid === task.id),
    }));
  }

  findOne(id: number) {
    const task = tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException('Task not found');

    return {
      ...task,
      subtasks: subtasks.filter((s) => s.taskid === id),
    };
  }


  update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) throw new NotFoundException('Task not found');

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updateTaskDto,
    };

    return tasks[taskIndex];
  }

  remove(id: number) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException('Task not found');

    const deletedTask = tasks[index];
    tasks.splice(index, 1);

    for (let i = subtasks.length - 1; i >= 0; i--) {
      if (subtasks[i].taskid === id) {
        subtasks.splice(i, 1);
      }
    }

    return deletedTask;
  }


  updateTocompleted(id: number) {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) throw new NotFoundException('Task not found');

    const task = tasks[taskIndex];

    if (task.status === 'pending') {
      throw new BadRequestException(
        'Task cannot be completed directly from pending',
      );
    }

    if (task.status === 'completed') {
      throw new BadRequestException('Task is already completed');
    }

    const taskSubtasks = subtasks.filter(
      (s) => s.taskid === task.id,
    );

    const hasIncompleteSubtask = taskSubtasks.some(
      (s) => s.status !== 'completed',
    );

    if (hasIncompleteSubtask) {
      throw new BadRequestException(
        'Complete all subtasks before completing task',
      );
    }

    tasks[taskIndex] = {
      ...task,
      status: 'completed',
    };

    return tasks[taskIndex];
  }

  updateTopending(id: number) {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) throw new NotFoundException('Task not found');

    if (tasks[taskIndex].status === 'completed') {
      throw new BadRequestException(
        'Completed task cannot be moved back to pending',
      );
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      status: 'pending',
    };

    return tasks[taskIndex];
  }

  updateToInprocess(id: number) {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) throw new NotFoundException('Task not found');

    if (tasks[taskIndex].status === 'completed') {
      throw new BadRequestException(
        'Completed task cannot move to in process',
      );
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      status: 'in process',
    };

    return tasks[taskIndex];
  }


  updateTopendingSubtask(id: number) {
    const index = subtasks.findIndex((t) => t.sid === id);
    if (index === -1) throw new NotFoundException('Subtask not found');

    if (subtasks[index].status === 'completed') {
      throw new BadRequestException(
        'Completed subtask cannot be moved back to pending',
      );
    }

    subtasks[index] = {
      ...subtasks[index],
      status: 'pending',
    };

    return subtasks[index];
  }

  updateToInprocessSubtask(id: number) {
    const index = subtasks.findIndex((t) => t.sid === id);
    if (index === -1) throw new NotFoundException('Subtask not found');

    if (subtasks[index].status === 'completed') {
      throw new BadRequestException(
        'Completed subtask cannot move to in process',
      );
    }

    subtasks[index] = {
      ...subtasks[index],
      status: 'in process',
    };

    return subtasks[index];
  }

  updateTocompletedSubtask(id: number) {
    const index = subtasks.findIndex((t) => t.sid === id);
    if (index === -1) throw new NotFoundException('Subtask not found');

    if (subtasks[index].status === 'pending') {
      throw new BadRequestException(
        'Subtask cannot be completed directly from pending',
      );
    }

    subtasks[index] = {
      ...subtasks[index],
      status: 'completed',
    };

    return subtasks[index];
  }
}
