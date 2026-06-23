import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
  ) {}

  getTasks() {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: number) {
    const task =
      await this.prisma.task.findUnique({
        where: { id },
      });

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
    return this.prisma.task.create({
      data: {
        title,
        description,
      },
    });
  }
}