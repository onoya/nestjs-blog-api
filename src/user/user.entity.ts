import * as bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Exclude({ toPlainOnly: true })
  firstName: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @Expose()
  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  @BeforeInsert()
  @Exclude()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
