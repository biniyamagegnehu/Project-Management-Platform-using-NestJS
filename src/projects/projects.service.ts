import {
 Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

import {
 CreateProjectDto,
} from './dto/create-project.dto';

import {
 GetProjectsDto,
}
from './dto/get-projects.dto';
import { ProjectsRepository } from './repositories/projects.repository';

@Injectable()
export class ProjectsService {

constructor(

 private repository:
 ProjectsRepository,

) {}

create(
 dto: CreateProjectDto,
) {

 return this.repository.create({

  title:
   dto.title,

  description:
   dto.description,

  owner: {

   connect: {

    id:
     dto.ownerId,

   },

  },

  tasks:
   dto.tasks?.length
   ? {

      create:
       dto.tasks,

     }
   : undefined,

 });

}

async findAll(
 query: GetProjectsDto,
) {

 const {
  page,
  limit,
  search,
  sort,
 } = query;

 const where:
 Prisma.ProjectWhereInput =
 search
  ? {

      title: {

       contains:
        search,

       mode:
        Prisma.QueryMode.insensitive,

      },

    }
  : {};

 const [
  projects,
  total,
 ] =
 await Promise.all([

  this.repository.findMany({

   skip:
    (page-1)
    *
    limit,

   take:
    limit,

   where,

   orderBy:{
    createdAt:
     sort ||
     'desc',
   },

   include:{

    owner:true,

    _count:{
     select:{
      tasks:true,
     },
    },

   },

  }),

  this.repository.count(
 where,
),

 ]);

 return {

  data:
   projects,

  meta:{

   total,

   page,

   limit,

   pages:
    Math.ceil(
     total
     /
     limit,
    ),

  },

 };

}

async createFull(
 dto: CreateProjectDto,
) {

 return this.repository
 .getPrisma()
 .$transaction(

  async (
   tx,
  ) => {

   const project =
    await tx.project.create({

     data: {

      title:
       dto.title,

      description:
       dto.description,

      owner: {

       connect: {

        id:
         dto.ownerId,

       },

      },

     },

    });

   if (
    dto.tasks
    ?.length
   ) {

    await tx.task.createMany({

     data:

      dto.tasks.map(

       (
        task,
       ) => ({

        title:
         task.title,

        projectId:
         project.id,

       }),

      ),

    });

   }

   await tx.activity.create({

    data: {

     action:
      'Project Created',

     projectId:
      project.id,

    },

   });

   return project;

  },

 );

}

}
