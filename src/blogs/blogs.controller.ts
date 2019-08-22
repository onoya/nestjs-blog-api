import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/create-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly service: BlogsService) {}

  @Get()
  all() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: BlogDto ) {
    return this.service.create(dto);
  }

  @Get(':id')
  one(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: BlogDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
