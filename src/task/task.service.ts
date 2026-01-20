/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { tasks } from './constants/tasks';
import { subtasks } from './constants/subatasks';

@Injectable()

export class TaskService {
  create(createTaskDto: CreateTaskDto) {
    const {
      title,
      uid,
      subtasks: dtoSubtasks,
      startTime,
      deadline,
    } = createTaskDto;

    const existing = tasks.find(
      (t) => t.title.toLowerCase() === title.toLowerCase(),
    );
    if (existing) {
      throw new Error('TASK TITLE ALREADY EXISTS');
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
      dtoSubtasks.map((s) => {
        const newSubtask = {
          sid: Date.now() ,
          taskid: taskId,
          title: s.title,
          status: 'pending',
        };
        subtasks.push(newSubtask);
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

    for (let i = 0; i <= subtasks.length - 1; i--) {
      if (subtasks[i].taskid === id) {
        subtasks.splice(i, 1);
      }
    }

    return deletedTask;
  }

  updateTocompleted(id: number) {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) throw new NotFoundException('Task not found');

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      status: 'completed',
    };
    return tasks[taskIndex];
  }

  updateTopending(id: number) {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) throw new NotFoundException('Task not found');

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      status: 'pending',
    };
    return tasks[taskIndex];
  }
  updateToInprocess(id: number) {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) throw new NotFoundException('Task not found');

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      status: 'in process',
    };
    return tasks[taskIndex];
  }
  updateTopendingSubtask(id: number) {
    const taskIndex = subtasks.findIndex((t) => t.sid === id);
    if (taskIndex === -1) throw new NotFoundException('Task not found');

    subtasks[taskIndex] = {
      ...subtasks[taskIndex],
      status: 'pending',
    };
    return subtasks[taskIndex];
  }
  updateToInprocessSubtask(id: number) {
    const taskIndex = subtasks.findIndex((t) => t.sid === id);
    if (taskIndex === -1) throw new NotFoundException('Task not found');

    subtasks[taskIndex] = {
      ...subtasks[taskIndex],
      status: 'in process',
    };
    return subtasks[taskIndex];
  }
  updateTocompletedSubtask(id: number) {
    const taskIndex = subtasks.findIndex((t) => t.sid === id);
    if (taskIndex === -1) throw new NotFoundException('Task not found');

    subtasks[taskIndex] = {
      ...subtasks[taskIndex],
      status: 'completed',
    };
    return subtasks[taskIndex];
  }
}
