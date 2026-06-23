import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [
    {
      id: 1,
      title: 'Learn NestJS',
      description: 'Learn DTO',
    },
  ];

  getTasks() {
    return this.tasks;
  }

  getTaskById(id: number) {
    const task = this.tasks.find(
      (task) => task.id === id,
    );

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    return task;
  }

  createTask(
    title: string,
    description?: string,
  ) {
    const task = {
      id: this.tasks.length + 1,
      title,
      description:
        description ?? '',
    };

    this.tasks.push(task);

    return task;
  }
}