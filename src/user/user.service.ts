import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User) {
    const entity = Object.assign(new User(), user);
    const res = await this.userRepository.save(entity);
    const { password, ...userWithoutPassword } = res;
    return userWithoutPassword;
  }
}
