import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { RolService } from './rol.service';
import { RolDto } from './dto/rol.dto';

@Controller('rol')
export class RolController {
    constructor(private readonly rolService: RolService) {}

    @Get()
    async getRoles() {
        return await this.rolService.getAll();
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    newRole(@Body() rol: RolDto) {
        return this.rolService.create(rol);
    }
}
