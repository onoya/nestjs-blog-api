import { Controller, Body, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: UserService) {}

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return this.service.create(user);
  }
}
