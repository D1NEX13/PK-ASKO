import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../products/product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, cart => cart.items)
  cart: Cart;
  @Column()
  cartId: number;

  @ManyToOne(() => Product)
  product: Product;
  @Column()
  productId: number;

  @Column({ default: 1 })
  quantity: number;
}