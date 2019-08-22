import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('blogs')
export class BlogsController {
  @Get()
  all() {
    return 'Fetch all blogs';
  }

  @Post()
  create() {
    return 'Create blog';
  }

  @Get(':id')
  one(@Param('id') id: string) {
    return `Get blog ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `Update blog ${id}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `Delete blog ${id}`;
  }
}
