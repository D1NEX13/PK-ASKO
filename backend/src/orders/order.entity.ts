import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;
  @Column()
  userId: number;

  @Column({ default: 'new' }) 
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column()
  paymentMethod: string; 

  @Column()
  deliveryMethod: string; 

  @Column('text', { nullable: true })
  deliveryAddress: string;

  @Column('float', { nullable: true })
  deliveryPrice: number;

  @Column({ nullable: true })
  trackingNumber: string;

  @Column('text', { nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];
}