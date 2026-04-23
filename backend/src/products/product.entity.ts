import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Certificate } from '../certificates/certificate.entity';
import { OrderItem } from '../orders/order-item.entity';
import { CartItem } from '../cart/cart-item.entity';
import { Question } from '../questions/question.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  article: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('float', { nullable: true })
  weight: number; 

  @Column('float', { nullable: true })
  length: number; 

  @Column('float', { nullable: true })
  width: number;

  @Column('float', { nullable: true })
  height: number;

  @Column({ default: true })
  inStock: boolean;

  @Column({ default: 0 })
  quantity: number;
  
  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ nullable: true })
  partType: string; 

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, category => category.products, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
  @Column({ nullable: true })
  categoryId: number;

  @ManyToMany(() => Certificate)
  @JoinTable({ name: 'product_certificates' })
  certificates: Certificate[];

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => CartItem, cartItem => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => Question, question => question.product)
  questions: Question[];
}