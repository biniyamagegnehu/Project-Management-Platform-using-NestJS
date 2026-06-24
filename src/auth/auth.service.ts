import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.users.findByEmail(dto.email);

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.users.create({
      email: dto.email,
      name: dto.name,
      password: hashed,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.password);

    if (!valid) {
      throw new Error('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    const hash = await bcrypt.hash(tokens.refresh_token, 10);

    await this.users.updateRefreshToken(user.id, hash);

    return tokens;
  }

 private async generateTokens(

 userId:number,

 email:string,

){

 const access =

 await this.jwt.signAsync({

  sub:userId,

  email,

 });

 const refresh =

 await this.jwt.signAsync(

 {

  sub:userId,

 },

 {

  secret:

   this.config
   .getOrThrow<string>(

    'JWT_REFRESH_SECRET',

   ),

  expiresIn:

   '7d',

 },

 );

 return{

  access_token:
   access,

  refresh_token:
   refresh,

 };

}

  async refresh(userId: number, refreshToken: string) {
    const user = await this.users.findById(userId);

    if (!user) {
      throw new Error('Invalid refresh token');
    }

    const valid = await bcrypt.compare(refreshToken, user.refreshToken ?? '');

    if (!valid) {
      throw new Error('Invalid refresh token');
    }

    return this.generateTokens(user.id, user.email);
  }
}
