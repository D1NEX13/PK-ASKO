import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  type: string; 

  @Column('text', { nullable: true })
  announce: string;

  @Column('text', { nullable: true })
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'date' })
  publishedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ default: 0 })
  sortOrder: number;

  @ManyToOne(() => User, { nullable: true })
  author: User;
  @Column({ nullable: true })
  authorId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}