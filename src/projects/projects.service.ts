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

@Injectable()
export class ProjectsService {

 constructor(
  private prisma:
   PrismaService,
 ) {}

 create(
 dto:
 CreateProjectDto,
) {

 return this.prisma.project.create({

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

   tasks:
    dto.tasks?.length
     ? {

        create:
         dto.tasks,

       }
     : undefined,

  },

  include: {

   tasks:true,

  },

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

  this.prisma.project.findMany({

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

  this.prisma.project.count({

   where,

  }),

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

}
