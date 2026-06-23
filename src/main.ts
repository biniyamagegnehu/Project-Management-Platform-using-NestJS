import {
 ValidationPipe,
} from '@nestjs/common';

import {
 TransformInterceptor,
}
from './common/transform/transform.interceptor';

import { NestFactory }
from '@nestjs/core';

import { AppModule }
from './app.module';

import {
 HttpExceptionFilter,
} from './common/http-exception/http-exception.filter';

async function bootstrap() {
 const app =
  await NestFactory.create(
   AppModule,
  );

app.useGlobalPipes(
 new ValidationPipe({

  transform: true,

 }),

);

 app.useGlobalInterceptors(
  new TransformInterceptor(),
 );

 app.useGlobalFilters(
  new HttpExceptionFilter(),
 );

 await app.listen(3000);
}

bootstrap();