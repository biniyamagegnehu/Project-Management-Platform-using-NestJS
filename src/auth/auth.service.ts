import {
 Injectable,

 ConflictException,

} from '@nestjs/common';

import * as bcrypt
from 'bcrypt';

import {
 UsersService,
} from '../users/users.service';

import {
 SignupDto,
} from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()

export class AuthService {

constructor(

 private users:
 UsersService,

 private jwt:
 JwtService,

){}

 async signup(
  dto:
  SignupDto,
 ) {

  const existing =

   await this.users
    .findByEmail(

     dto.email,

    );

  if (
   existing
  ) {

   throw new ConflictException(

    'Email already exists',

   );

  }

  const hashed =

   await bcrypt
    .hash(

     dto.password,

     10,

    );

  const user =

   await this.users
    .create({

     email:
      dto.email,

     name:
      dto.name,

     password:
      hashed,

    });

  return {

   id:
    user.id,

   email:
    user.email,

   name:
    user.name,

  };

 }

 async login(
 dto:
 LoginDto,
){

 const user=

 await this.users
 .findByEmail(
  dto.email,
 );

 if(
  !user
 ){

  throw new Error(
   'Invalid credentials',
  );

 }

 const valid=

 await bcrypt.compare(

  dto.password,

  user.password,

 );

 if(
  !valid
 ){

  throw new Error(
   'Invalid credentials',
  );

 }

 const token=

 this.jwt.sign({

  sub:
   user.id,

  email:
   user.email,

 });

 return{

  access_token:
   token,

 };

}

}