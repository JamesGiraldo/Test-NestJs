import { AuthReposity } from './../auth/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { Userentity } from './user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Userentity, AuthReposity ]) ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
