import {
 Injectable,
} from '@nestjs/common';

import {
 PrismaService,
} from '../prisma/prisma.service';

import {
 CreateProjectDto,
} from './dto/create-project.dto';

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

}