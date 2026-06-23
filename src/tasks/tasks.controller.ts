import {
 Body,
 Controller,
 Get,
 Param,
 ParseIntPipe,
 Post,
 UseGuards,
} from '@nestjs/common';

import { TasksService }
from './tasks.service';

import { CreateTaskDto }
from './dto/create-task.dto';

import {
 ApiKeyGuard,
}
from '../common/api-key/api-key.guard';

@Controller('tasks')
export class TasksController {

 constructor(
  private readonly tasksService:
   TasksService,
 ) {}

 @Get()
 getTasks() {
  return this.tasksService
   .getTasks();
 }

 @Get(':id')
 getTaskById(
  @Param(
   'id',
   ParseIntPipe,
  )
  id: number,
 ) {
  return this.tasksService
   .getTaskById(id);
 }

@Post()
@UseGuards(
 ApiKeyGuard,
)
createTask(
 @Body()
 createTaskDto:
  CreateTaskDto,
) {

 return this.tasksService
  .createTask(
   createTaskDto.title,
   createTaskDto.description,
  );

}

}