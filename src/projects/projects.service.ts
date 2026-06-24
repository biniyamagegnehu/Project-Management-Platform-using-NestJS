import {
 Injectable,
} from '@nestjs/common';

import {
 PrismaService,
} from '../prisma/prisma.service';

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
 query:
 GetProjectsDto,
) {

 const {
  page,
  limit,
  search,
  sort,
 } = query;

 return this.prisma.project.findMany({

  skip:
   (page-1)
   *
   limit,

  take:
   limit,

  where:
   search
   ? {

      title: {

       contains:
        search,

       mode:
        'insensitive',

      },

     }
   : undefined,

  orderBy: {

   createdAt:
    sort
    ||
    'desc',

  },

  include: {

   tasks:true,

   owner:true,

  },

 });

}

}
