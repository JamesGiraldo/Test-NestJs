import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { RolEntity } from './../rol/rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

import { JwtStrategyLogin } from './../login/strategies/jwt.strategy';

import { Userentity } from './../user/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Userentity, RolEntity ]),
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
  providers: [RegisterService, ConfigService,  JwtStrategyLogin],
  controllers: [RegisterController],
  exports: [ PassportModule, JwtStrategyLogin ]
})
export class RegisterModule {}
