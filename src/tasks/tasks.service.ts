import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
  ) {}

  // ← Step 3 change
  getTasks() {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ← Step 4 change
  async getTaskById(
    id: number,
  ) {
    const task =
      await this.prisma.task.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
          title: true,
          description: true,
        },
      });

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    return task;
  }

  createTask(
    dto: CreateTaskDto,
  ) {
    return this.prisma.task.create({
      data: dto,
    });
  }
}