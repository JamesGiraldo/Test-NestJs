import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { LoginReposity } from './login.repository';
import { Userentity } from './../user/user.entity';
import { LoginDto } from './dto/login.dto';

import { RoleType } from './../rol/rol.enum';

import { HTTP_MESSAGE } from './../config/constants';
import { PayloadInterface } from './payload.interface';

@Injectable()
export class LoginService {

    constructor(
        @InjectRepository(Userentity)
        private loginReposity: LoginReposity,
        private readonly jwtService: JwtService
    ) { }

    async login(user: LoginDto): Promise<any> {
        const { username, password } = user;
        const loginUser = await this.loginReposity.findOne({ where: [{username: username }, { email: username } ]});
        if (!loginUser) return new UnauthorizedException(HTTP_MESSAGE.CREDENTIAL_INCORRECT);

        const passwordOk = await compare(password, loginUser.password);
        if (!passwordOk) throw new UnauthorizedException(HTTP_MESSAGE.CREDENTIAL_INCORRECT);
        const payload: PayloadInterface = {
            name: loginUser.name,
            username: loginUser.username,
            email: loginUser.email,
            id: loginUser.id,
            roles: loginUser.roles.map(role => role.roleName as RoleType ),
        };
        const token = await this.jwtService.sign(payload);
        return {token};
    }
}
