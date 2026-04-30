import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('services')
export class Service {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  slug: string;

  @ApiProperty({ required: false })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({ type: [String], required: false })
  @Column('simple-array', { nullable: true })
  gallery: string[];

  @ApiProperty()
  @Column({ default: 0 })
  sortOrder: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}