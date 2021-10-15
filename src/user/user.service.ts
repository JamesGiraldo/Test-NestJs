import { AuthReposity } from './../auth/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Userentity } from './user.entity';
import { UserReposity } from './user.repository';
import { UserDto } from './dto/user.dto';

import { HTTP_MESSAGE } from './../config/constants';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Userentity)
        private userReposity: UserReposity,
        private authReposity: AuthReposity
    ) {}

    /** All users with the user role */
    async getUsersRoleUser(): Promise<any[]> {
        const users = await this.authReposity.find();
        if (!users.length) throw new NotFoundException( HTTP_MESSAGE.NO_DATA );
        const usersData = users.map((user: Userentity) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
                roles: user.roles
            };
        });
        return usersData
    }


    /** All users with all roles */
    async getUsers(): Promise<any[]> {
        const users = await this.userReposity.find();
        if (!users.length) throw new NotFoundException( HTTP_MESSAGE.NO_DATA );
        const usersData = users.map((user: Userentity) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
                roles: user.roles
            };
        });
        return usersData
    }

    /** a user by means of the id */
    async getById(id: number): Promise<Userentity> {
        const user = await this.userReposity.findOne(id);
        if (!user) throw new NotFoundException( HTTP_MESSAGE.ID_NOT_FOUND );
        return user;
    }

    /** update a user by id */
    async update(id: number, user: UserDto): Promise<any> {
        const userId = await this.getById(id);
        const existsEmail = await this.userReposity.findOne({where: {email: user.email}});
        const existsUsername = await this.userReposity.findOne({where: {username: user.username}});

        if (!userId) throw new NotFoundException( HTTP_MESSAGE.USER_NOT_FOUND_BY_ID );
        if (existsEmail) throw new NotFoundException( HTTP_MESSAGE.EMAIL_ALREADY_EXISTS );
        if (existsUsername) throw new NotFoundException( HTTP_MESSAGE.USER_ALREADY_EXISTS );

        const userUpdate = await this.userReposity.update(userId, user);
        if (!userUpdate) throw new NotFoundException( HTTP_MESSAGE.NO_RESULT );
        return user;
    }

}
