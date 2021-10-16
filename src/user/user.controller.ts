import { Controller, Get, UsePipes, ValidationPipe, ParseIntPipe, Param, Body, Put, Delete, UseGuards } from '@nestjs/common';

import { Userentity } from './user.entity';
import { UserService } from './user.service';

import { JwtAuthGuard } from './../guards/jwt.guard';
import { RolesGuard } from './../guards/rol.guard';
import { RoleType } from './../rol/rol.enum';

import { UserDto } from './dto/user.dto';
import { RolDecorator } from './../decorators/rol.decorator';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @RolDecorator(RoleType.ADMIN, RoleType.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.userService.getUsers();
    }

    @RolDecorator(RoleType.ADMIN, RoleType.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('users')
    async getUsers() {
        return await this.userService.getUsersRoleUser();
    }

    @RolDecorator(RoleType.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Get('/:id')
    async getUser( @Param('id', ParseIntPipe) id: number): Promise<Userentity> {
        return await this.userService.getById( id );
    }

    @RolDecorator(RoleType.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put('/:id')
    async updateUser( @Param('id', ParseIntPipe) id: number, @Body() user: UserDto ): Promise<Userentity> {
        return await this.userService.update( id, user );
    }

}
