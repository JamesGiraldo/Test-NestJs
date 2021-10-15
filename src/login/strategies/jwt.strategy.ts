import * as dotenv from 'dotenv'; dotenv.config();

import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginReposity } from './../login.repository';
import { Userentity } from './../../user/user.entity';
import { PayloadInterface } from '../payload.interface';

import { HTTP_MESSAGE } from './../../config/constants';

@Injectable()
export class JwtStrategyLogin extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Userentity)
        private readonly loginReposity: LoginReposity,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    async validate(payload: PayloadInterface) {
        const { username, email } = payload;
        const user = await this.loginReposity.findOne({ where: [{username: username }, { email: email } ]});
        if (!user) throw new UnauthorizedException(HTTP_MESSAGE.CREDENTIAL_INCORRECT);
        return payload;
    }
}