import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
    constructor( private readonly loginService: LoginService ) {}

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    async register( @Body() authUser: LoginDto ) {
        return await this.loginService.login( authUser );
    }
}
