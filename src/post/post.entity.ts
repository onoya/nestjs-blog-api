import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, user => user.posts, { nullable: false, eager: true })
  user: User;
}
