import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService ) {}

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('new')
    async register( @Body() authUser: AuthUserDto ) {
        return await this.authService.register( authUser );
    }
}
