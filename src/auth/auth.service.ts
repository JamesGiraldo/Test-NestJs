import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthReposity } from './auth.repository';
import { AuthUserDto } from './dto/auth.dto';
import { Userentity } from './../user/user.entity';

import { RolRepository } from './../rol/rol.repository';
import { RolEntity } from './../rol/rol.entity';

import { HTTP_MESSAGE } from './../config/constants';
import { RoleType } from './../rol/rol.enum';
import { PayloadInterface } from 'src/login/payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(RolEntity)
        private rolRepository: RolRepository,
        @InjectRepository(Userentity)
        private authReposity: AuthReposity,
        private readonly jwtService: JwtService
    ) { }

    async register(user: AuthUserDto): Promise<any> {
        await this.existingData(user);

        const role = await this.getRoleUser();

        const newUser = await this.authReposity.create(user);
        newUser.roles = role;
        await this.authReposity.save(newUser);
        const usersData: PayloadInterface = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            roles: newUser.roles.map(role => role.roleName as RoleType ),
        };
        const token = await this.jwtService.sign(usersData);

        return {usersData, token};
    }

    private async existingData(user: AuthUserDto): Promise<any> {
        const { username, email } = user;
        const existsEmail = await this.authReposity.findOne({ where: { email: email } });
        if (existsEmail) throw new NotFoundException(HTTP_MESSAGE.EMAIL_ALREADY_EXISTS);
        const existsUsername = await this.authReposity.findOne({ where: { username: username } });
        if (existsUsername) throw new NotFoundException(HTTP_MESSAGE.USER_ALREADY_EXISTS);

        return true;
    }

    private async getRoleUser(): Promise<any> {
        const roleUser = await this.rolRepository.findOne({ where: { roleName: RoleType.USER } });
        if (!roleUser) throw new NotFoundException(HTTP_MESSAGE.ROLE_NOT_FOUND);
        return [roleUser];
    }
}
