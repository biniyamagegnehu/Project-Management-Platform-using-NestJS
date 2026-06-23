import {
 Module,
 MiddlewareConsumer,
 NestModule,
} from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';

import { AppController }
from './app.controller';

import { AppService }
from './app.service';

import { TasksModule }
from './tasks/tasks.module';

import { LoggerMiddleware }
from './common/logger/logger.middleware';

@Module({
 imports: [
  TasksModule,
  PrismaModule,
  ProjectsModule,
 ],
 controllers: [
  AppController,
 ],
 providers: [
  AppService,
 ],
})

export class AppModule
 implements NestModule {

 configure(
  consumer:
   MiddlewareConsumer,
 ) {

  consumer
   .apply(
    LoggerMiddleware,
   )
   .forRoutes('*');

 }

}