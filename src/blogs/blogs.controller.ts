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
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly service: BlogsService) {}

  @Get()
  all() {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: BlogDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  one(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: BlogDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
