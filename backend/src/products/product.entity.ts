import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    slug: string;

    @Column()
    name: string;

    @Column({ unique: true })
    article: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('text', { nullable: true })
    description: string;

    @Column({ default: true })
    inStock: boolean;

    @Column('simple-array', { nullable: true })
    images: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}