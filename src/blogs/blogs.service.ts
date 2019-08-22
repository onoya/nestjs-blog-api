import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { BlogDto } from './dto/blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
   ) {}

  async findAll(): Promise<Blog[]> {
    return await this.blogRepository.find();
  }

  async findOne(id: number): Promise<Blog> {
    try {
      return await this.blogRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async create(blogDto: BlogDto) {
    return await this.blogRepository.save(blogDto);
  }

  async update(id: number, blogDto: BlogDto) {
    await this.blogRepository.findOneOrFail(id);
    return await this.blogRepository.save({ ...blogDto, id });
  }

  async delete(id: number) {
    await this.blogRepository.findOneOrFail(id);
    return await this.blogRepository.delete(id);
  }
}
