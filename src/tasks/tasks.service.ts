import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  getTasks() {
    return [
      {
        id: 1,
        title: 'Learn NestJS',
      },
      {
        id: 2,
        title: 'Build FlowBoard',
      },
    ];
  }
}