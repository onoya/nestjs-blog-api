import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [TypeOrmModule.forRoot(), BlogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
