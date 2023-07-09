import { BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, Unique, PrimaryColumn } from 'typeorm';
import { enumSocialPlatform } from 'src/config/enums';

@Entity()
@Unique(['email', 'nickname'])
export class User extends BaseEntity {
  @PrimaryColumn()
  ci: string

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column({
    type: 'enum',
    enum: enumSocialPlatform
  })
  RegSocialPlatform: enumSocialPlatform
  
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
