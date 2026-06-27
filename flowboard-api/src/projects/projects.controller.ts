import {
 Body,
 Controller,
 Delete,
 Get,
 Param,
 Patch,
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

import {
 GetUser,
}
from
'../auth/decorators/get-user.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

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

 @GetUser()
 user,

){

 console.log(

  user,

 );

 return this.projectsService
 .findAll({

  page:1,

  limit:10,

 });

}

@Post()

@UseGuards(
 JwtAuthGuard,
)

create(

 @Body()
 dto,

 @GetUser()
 user,

){

 return this
 .projectsService
 .createFull(

  dto,

  user.id,

 );

}


@Patch(
 ':id',
)

@UseGuards(
 JwtAuthGuard,
)

update(

 @Param(
  'id',
 )
 id:string,

 @Body()
 dto,

 @GetUser()
 user,

){

 return this
 .projectsService
 .update(

  +id,

  dto,

  user,

 );

}

@Delete(
 ':id',
)

remove(

 @Param(
  'id',
 )
 id:string,

 @GetUser()
 user,

){

 return this
 .projectsService
 .remove(

  +id,

  user,

 );

}
}