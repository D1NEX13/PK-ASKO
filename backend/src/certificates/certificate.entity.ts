import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column()
  fileUrl: string;

  @Column({ type: 'date', nullable: true })
  issueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Product, product => product.certificates)
  products: Product[];
}