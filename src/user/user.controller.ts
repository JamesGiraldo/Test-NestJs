import { Controller, Get, UsePipes, ValidationPipe, ParseIntPipe, Param, Body, Put, Delete } from '@nestjs/common';

import { Userentity } from './user.entity';
import { UserService } from './user.service';

import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get()
    async getAll() {
        return await this.userService.getUsers();
    }

    @Get('users')
    async getUsers() {
        return await this.userService.getUsersRoleUser();
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Get('/:id')
    async getUser( @Param('id', ParseIntPipe) id: number): Promise<Userentity> {
        return await this.userService.getById( id );
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put('/:id')
    async updateUser( @Param('id', ParseIntPipe) id: number, @Body() user: UserDto ): Promise<Userentity> {
        return await this.userService.update( id, user );
    }

}
