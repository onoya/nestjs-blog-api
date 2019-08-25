import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  async register(@Body() user: RegisterDto): Promise<User> {
    return this.service.register(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginData: LoginDto, @Request() req) {
    return this.service.login(req.user);
  }
}
