import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RegisterReposity } from './register.repository';

import { Userentity } from './../user/user.entity';

import { RolRepository } from './../rol/rol.repository';
import { RolEntity } from './../rol/rol.entity';
import { RoleType } from './../rol/rol.enum';

import { UserDto } from './../user/dto/user.dto';
import { HTTP_MESSAGE } from './../config/constants';
import { PayloadInterface } from 'src/login/payload.interface';

@Injectable()
export class RegisterService {

    constructor(
        @InjectRepository(RolEntity)
        private rolRepository: RolRepository,
        @InjectRepository(Userentity)
        private registerReposity: RegisterReposity,
        private readonly jwtService: JwtService
    ) { }


    async register(user: UserDto): Promise<any> {
        await this.existingData(user);

        const role = await this.getRoleAdmin();

        const newUser = await this.registerReposity.create(user);
        newUser.roles = role;
        await this.registerReposity.save(newUser);
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

    private async existingData(user: UserDto): Promise<any> {
        const { username, email } = user;
        const existsEmail = await this.registerReposity.findOne({ where: { email: email } });
        if (existsEmail) throw new NotFoundException(HTTP_MESSAGE.EMAIL_ALREADY_EXISTS);
        const existsUsername = await this.registerReposity.findOne({ where: { username: username } });
        if (existsUsername) throw new NotFoundException(HTTP_MESSAGE.USER_ALREADY_EXISTS);

        return true;
    }

    // private async getRoleUser(): Promise<any> {
    //     const roleUser = await this.rolRepository.findOne({ where: { roleName: RoleType.USER } });
    //     if (!roleUser) throw new NotFoundException(HTTP_MESSAGE.ROLE_NOT_FOUND);
    //     return [roleUser];
    // }

    private async getRoleAdmin(): Promise<any> {
        const roleAdmin = await this.rolRepository.findOne({ where: { roleName: RoleType.ADMIN } });
        const roleUser = await this.rolRepository.findOne({ where: { roleName: RoleType.USER } });
        if (!roleAdmin || !roleUser) throw new NotFoundException(HTTP_MESSAGE.ROLE_NOT_FOUND);
        return [roleAdmin, roleUser];
    }

}
