import {Entity, PrimaryColumn, Column, UpdateDateColumn, OneToMany} from "typeorm";
import {Transaction} from "./Transaction";

const tableName = 'stocks';

@Entity()
export class Stock {
  static tableName = tableName;

  @PrimaryColumn({ length: 3 })
  symbol: string;

  @Column({ length: 100 })
  name: string;

  @Column('decimal', { scale: 2 })
  price: number;

  @OneToMany(() => Transaction, transaction => transaction.stock)
  transactions: Transaction[];

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;
}
