import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { RegisterService } from './register.service';
import { UserDto } from './../user/dto/user.dto';

@Controller('register')
export class RegisterController {

    constructor( private readonly registerService: RegisterService ) {}

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    async register( @Body() userAdmin: UserDto ) {
        return await this.registerService.register( userAdmin );
    }
}
