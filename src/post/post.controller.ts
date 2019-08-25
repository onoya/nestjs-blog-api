import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../user/user.entity';
import { PostDto } from './dto/post.dto';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';

@ApiUseTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostService) {}

  @Get()
  all(): Promise<PostEntity[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: PostDto, @CurrentUser() user: User): Promise<PostEntity> {
    return this.service.create(dto, user);
  }

  @Get(':id')
  one(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.service.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PostDto,
  ): Promise<PostEntity> {
    return this.service.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}
