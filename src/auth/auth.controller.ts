import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return this.service.register(user);
  }

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.service.login(credentials);
  }
}
