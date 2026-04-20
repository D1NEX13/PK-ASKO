import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorName: string;

  @Column({ nullable: true })
  contact: string;

  @Column('text')
  text: string;

  @Column('text', { nullable: true })
  answer: string;

  @Column({ default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, product => product.questions, { nullable: true })
  product: Product;
  @Column({ nullable: true })
  productId: number;

  @ManyToOne(() => User, user => user.questions, { nullable: true })
  user: User;
  @Column({ nullable: true })
  userId: number;
}