import { RolEntity } from './../rol/rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

import { Userentity } from './../user/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Userentity, RolEntity ]) ],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class RegisterModule {}
