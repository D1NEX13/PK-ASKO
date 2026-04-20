import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('machines')
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column('json', { nullable: true })
  specifications: any; 

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}