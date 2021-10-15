import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthReposity } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { Userentity } from './../user/user.entity';
import { RolEntity } from './../rol/rol.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ Userentity, RolEntity, AuthReposity ])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
