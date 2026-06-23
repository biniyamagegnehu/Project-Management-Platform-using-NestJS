import {
 CallHandler,
 ExecutionContext,
 Injectable,
 NestInterceptor,
} from '@nestjs/common';

import {
 Observable,
 map,
} from 'rxjs';

@Injectable()
export class TransformInterceptor
 implements NestInterceptor {

 intercept(
  context:
   ExecutionContext,

  next:
   CallHandler,
 ): Observable<any> {

  console.log(
   'Before controller',
  );

  return next
   .handle()
   .pipe(

    map((data) => {

     console.log(
      'After controller',
     );

     return {
      success: true,
      data,
     };

    }),

   );
 }

}