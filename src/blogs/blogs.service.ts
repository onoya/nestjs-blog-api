import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { BlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
   ) {}

  async findAll(): Promise<Blog[]> {
    return await this.blogRepository.find();
  }

  async findOne(id: string): Promise<Blog> {
    try {
      return await this.blogRepository.findOneOrFail(Number(id));
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async create(blogDto: BlogDto) {
    return await this.blogRepository.save(blogDto);
  }

  async update(id: string, blogDto: BlogDto) {
    await this.blogRepository.findOneOrFail(id);
    return await this.blogRepository.save({ ...blogDto, id: Number(id) });
  }

  async delete(id: string) {
    await this.blogRepository.findOneOrFail(id);
    return await this.blogRepository.delete(id);
  }
}
