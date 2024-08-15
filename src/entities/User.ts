import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Portfolio } from "./Portfolio";

const tableName = 'users';

@Entity()
export class User {
  static tableName = tableName;

  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Portfolio, portfolio => portfolio.user)
  portfolios: Portfolio[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
