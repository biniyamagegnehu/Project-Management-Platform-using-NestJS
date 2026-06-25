import {
 Injectable,
 NotFoundException,
 ForbiddenException,
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
@Injectable()

export class ProjectsService {

 constructor(

  private prisma:
   PrismaService,

 ) {}

 async findAll(

  dto:
  GetProjectsDto,

 ){

  const page =
   dto.page || 1;

  const limit =
   dto.limit || 10;

  const skip =
   (page - 1)
   * limit;

const where: Prisma.ProjectWhereInput =

 dto.search

 ? {

    title: {

     contains:
      dto.search,

     mode:
      Prisma.QueryMode.insensitive,

    },

   }

 : {};

  return this.prisma
  .project
  .findMany({

   where,

   skip,

   take:
    limit,

   include:{

    owner:true,

    tasks:true,

   },

   orderBy:{

    createdAt:
     'desc',

   },

  });

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