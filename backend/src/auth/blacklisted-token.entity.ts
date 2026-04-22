import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('blacklisted_tokens')
export class BlacklistedToken {
  @PrimaryColumn()
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}