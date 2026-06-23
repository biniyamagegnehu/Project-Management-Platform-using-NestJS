import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [
    {
      id: 1,
      title: 'Learn NestJS',
    },
  ];

  getTasks() {
    return this.tasks;
  }

  createTask(title: string) {
    const task = {
      id: this.tasks.length + 1,
      title,
    };

    this.tasks.push(task);

    return task;
  }
}