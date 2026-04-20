import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.chatMessages)
  user: User;
  @Column()
  userId: number;

  @Column('text')
  message: string;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  read: boolean;
}