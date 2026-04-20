import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { CartItem } from './cart-item.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.carts, { nullable: true })
  user: User;
  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  guestId: string; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
  items: CartItem[];
}