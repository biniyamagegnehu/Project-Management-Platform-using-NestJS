import {
 Module,
 MiddlewareConsumer,
 NestModule,
} from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';

import { AppController }
from './app.controller';

import { AppService }
from './app.service';

import { TasksModule }
from './tasks/tasks.module';

import { LoggerMiddleware }
from './common/logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
 imports: [
  ConfigModule.forRoot({

   isGlobal:true,

  }),
  TasksModule,
  PrismaModule,
  ProjectsModule,
  AuthModule,
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