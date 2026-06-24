import {
 Body,
 Controller,
 Get,
 Post,
 Query,
} from '@nestjs/common';

import {
 ProjectsService,
} from './projects.service';

import {
 CreateProjectDto,
} from './dto/create-project.dto';

import {
 GetProjectsDto,
}
from './dto/get-projects.dto';

import {
 UseGuards,
} from '@nestjs/common';

import {
 JwtAuthGuard,
} from '../auth/jwt-auth.guard';

@UseGuards(
 JwtAuthGuard,
)

@Controller(
 'projects',
)

@Controller(
 'projects',
)

export class ProjectsController {

 constructor(
  private projectsService:
   ProjectsService,
 ) {}

 @Get()

findAll(

 @Query()
 query:
 GetProjectsDto,

) {

 return this.projectsService
  .findAll(
   query,
  );

}

 @Post()

 create(

  @Body()
  dto:
   CreateProjectDto,

 ) {

  return this.projectsService
   .create(
    dto,
   );

 }

 @Post(
 'full',
)

createFull(

 @Body()
 dto:
 CreateProjectDto,

) {

 return this.projectsService
  .createFull(
   dto,
  );

}

}