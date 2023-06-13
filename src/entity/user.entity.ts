import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToOne, JoinColumn } from 'typeorm';
import { SocialPlatform } from './socialPlatform.entity';

@Entity()
@Unique(['email', 'nickname'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  ci: string;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @OneToOne(() => SocialPlatform)
  @JoinColumn()
  SocialPlatformId: SocialPlatform;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
