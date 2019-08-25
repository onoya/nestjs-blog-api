import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: RegisterDto) {
    const user = Object.assign(new User(), userData);
    return await this.userRepository.save(user);
  }

  async findByEmail(email): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
