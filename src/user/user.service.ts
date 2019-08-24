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

  async create(user: RegisterDto) {
    const entity = Object.assign(new User(), user);
    return await this.userRepository.save(entity);
  }

  async findByEmail(email): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
