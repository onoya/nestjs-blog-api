import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(user: RegisterDto) {
    return this.userService.create(user);
  }

  async login(user: Pick<User, 'email' | 'password'>) {
    return await this.validateCredentials(user.email, user.password);
    // TODO: Return JWT
  }

  async validateCredentials(email: User['email'], password: User['password']) {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid email');
      }
      if (!(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid password');
      }

      return user;
    } catch (error) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
