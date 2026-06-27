import {
 Module,
} from '@nestjs/common';

import {
 CacheModule,
} from '@nestjs/cache-manager';

import {
 redisStore,
} from 'cache-manager-redis-store';

@Module({

 imports:[

  CacheModule.registerAsync({

   isGlobal:true,

   useFactory:
   async()=>({

    store:
    await redisStore({

     socket:{

    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,

     },

     ttl:
      60,

    }),

   }),

  }),

 ],

 exports:[

  CacheModule,

 ],

})

export class AppCacheModule {}