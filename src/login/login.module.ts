import * as dotenv from 'dotenv'; dotenv.config();

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LoginService } from './login.service';
import { LoginReposity } from './login.repository';
import { LoginController } from './login.controller';

import { JwtStrategyLogin } from './strategies/jwt.strategy';

import { Userentity } from './../user/user.entity';
import { RolEntity } from './../rol/rol.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Userentity, RolEntity, LoginReposity ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ({
        // secret: configService.get<string>(JWT_SECRET),
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '12h' },
      }),
      inject: [ ConfigService ],
    }),
  ],
  providers: [LoginService, ConfigService,  JwtStrategyLogin],
  controllers: [LoginController],
  exports: [ PassportModule, JwtStrategyLogin ]
})
export class LoginModule {}
