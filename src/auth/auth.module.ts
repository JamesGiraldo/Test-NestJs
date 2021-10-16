import { PassportModule } from '@nestjs/passport';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthReposity } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtStrategyLogin } from './../login/strategies/jwt.strategy';

import { Userentity } from './../user/user.entity';
import { RolEntity } from './../rol/rol.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ Userentity, RolEntity, AuthReposity ]),
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
  providers: [AuthService, ConfigService, JwtStrategyLogin],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategyLogin]
})
export class AuthModule {}
