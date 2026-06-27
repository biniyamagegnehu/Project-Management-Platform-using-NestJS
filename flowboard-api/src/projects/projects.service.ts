import {
 Injectable,
 NotFoundException,
 ForbiddenException,
 Inject,
} from '@nestjs/common';

import {
 PrismaService,
} from '../prisma/prisma.service';

import {
 CreateProjectDto,
} from './dto/create-project.dto';

import {
 GetProjectsDto,
} from './dto/get-projects.dto';


import {
 Prisma,
} from '@prisma/client';

import { CACHE_MANAGER } from '@nestjs/cache-manager';

import type { Cache } from 'cache-manager';

@Injectable()

export class ProjectsService {

constructor(

 private prisma:
 PrismaService,

 @Inject(
  CACHE_MANAGER,
 )

 private cache:
 Cache,

){}

 async findAll(
 dto,
){

 const key =

 `projects:
 ${dto.page}
 :
 ${dto.limit}`;

 const cached =

 await this.cache
 .get(key);

 if(
  cached
 ){

  console.log(
   'CACHE HIT',
  );

  return cached;

 }

 console.log(
  'CACHE MISS',
 );

 const projects =

 await this.prisma
 .project
 .findMany({

  include:{

   owner:true,

   tasks:true,

  },

 });

 await this.cache
 .set(

  key,

  projects,

  60000,

 );

 return projects;

}

 async findOne(

  id:number,

 ){

  const project =

  await this.prisma
  .project
  .findUnique({

   where:{
    id,
   },

   include:{

    owner:true,

    tasks:true,

   },

  });

  if(
   !project
  ){

   throw new NotFoundException(
    'Project not found',
   );

  }

  return project;

 }

async createFull(

 dto,

 userId:number,

){

 return this.prisma
 .$transaction(

 async (
  tx,
 )=>{

 const project =

 await tx
 .project
 .create({

  data:{

   title:
   dto.title,

   description:
   dto.description,

   owner:{

    connect:{

     id:userId,

    },

   },

  },

 });

 await tx
 .activity
 .create({

  data:{

   action:

   `Created project ${project.title}`,

   projectId:
   project.id,

  },

 });

await this.cache.del(`projects:${userId}`);

 return project;

 },

 );

}

 async update(

  id:number,

  dto,

  user,

 ){

  const project =

  await this.prisma
  .project
  .findUnique({

   where:{
    id,
   },

  });

  if(
   !project
  ){

   throw new NotFoundException(
    'Project not found',
   );

  }

  const isOwner =

   project.ownerId
   ===
   user.id;

  const isAdmin =

   user.role
   ===
   'ADMIN';

  if(

   !isOwner
   &&
   !isAdmin

  ){

   throw new ForbiddenException(
    'Not allowed',
   );

  }

  return this.prisma
  .project
  .update({

   where:{
    id,
   },

   data:dto,

  });

 }

 async remove(

  id:number,

  user,

 ){

  const project =

  await this.prisma
  .project
  .findUnique({

   where:{
    id,
   },

  });

  if(
   !project
  ){

   throw new NotFoundException(
    'Project not found',
   );

  }

  const isOwner =

   project.ownerId
   ===
   user.id;

  const isAdmin =

   user.role
   ===
   'ADMIN';

  if(

   !isOwner
   &&
   !isAdmin

  ){

   throw new ForbiddenException(
    'Not allowed',
   );

  }

  return this.prisma
  .project
  .delete({

   where:{
    id,
   },

  });

 }

}