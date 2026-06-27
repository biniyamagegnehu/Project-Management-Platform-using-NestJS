import {
 Module,
} from '@nestjs/common';

import {
 ProjectsController,
} from './projects.controller';

import {
 ProjectsService,
} from './projects.service';

import {
 PrismaModule,
} from '../prisma/prisma.module';

import {
 ProjectsRepository,
}
from './repositories/projects.repository';

@Module({

 imports:[
  PrismaModule,
 ],

 controllers:[
  ProjectsController,
 ],

providers:[

 ProjectsService,

 ProjectsRepository,

],

})

export class ProjectsModule {}