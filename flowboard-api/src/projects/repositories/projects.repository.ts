import {
 Injectable,
} from '@nestjs/common';

import {
 Prisma,
} from '@prisma/client';

import {
 PrismaService,
} from '../../prisma/prisma.service';

@Injectable()

export class ProjectsRepository {

 constructor(

  private prisma:
   PrismaService,

 ) {}

 create(
  data:
  Prisma.ProjectCreateInput,
 ) {

  return this.prisma.project.create({

   data,

  });

 }

 findMany(
  args:
  Prisma.ProjectFindManyArgs,
 ) {

  return this.prisma.project.findMany(

   args,

  );

 }

 count(
  where:
  Prisma.ProjectWhereInput,
 ) {

  return this.prisma.project.count({

   where,

  });

 }

 transaction() {

  return this.prisma;

 }

 getPrisma() {

 return this.prisma;

}

}