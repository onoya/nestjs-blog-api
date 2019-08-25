import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    try {
      return await this.postRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async create(postDto: PostDto): Promise<Post> {
    return await this.postRepository.save(postDto);
  }

  async update(id: number, postDto: PostDto): Promise<Post> {
    await this.postRepository.findOneOrFail(id);
    return await this.postRepository.save({ ...postDto, id });
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.postRepository.findOneOrFail(id);
    return await this.postRepository.delete(id);
  }
}
