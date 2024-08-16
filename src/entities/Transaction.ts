import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn} from "typeorm";
import { Stock } from "./Stock";

const tableName = 'transactions';

@Entity(tableName)
export class Transaction {
  static tableName = tableName;

  @PrimaryGeneratedColumn()
  transactionId: number;

  @ManyToOne(() => Stock, stock => stock.transactions)
  @JoinColumn({ name: "stockSymbol" })
  stock: Stock;

  @Column()
  stockSymbol: string;

  @Column('int')
  quantity: number;

  @Column()
  transactionType: string;  // 'buy' veya 'sell'

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  transactionDate: Date;
}
