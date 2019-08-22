import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [TypeOrmModule.forRoot(), BlogsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
