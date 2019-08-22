import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(user: User) {
    return this.userService.create(user);
  }

  async login(user: Pick<User, 'email' | 'password'>) {
    return await this.validateCredentials(user.email, user.password);
    // TODO: Return JWT
  }

  private async validateCredentials(
    email: User['email'],
    password: User['password'],
  ) {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new Error('Invalid email');
      }
      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid password');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Invalid credentials');
    }
  }
}
