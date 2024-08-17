import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Stock } from "./Stock";
import { Portfolio } from "./Portfolio";

const tableName = 'transactions';

@Entity(tableName)
export class Transaction {
  static tableName = tableName;

  @PrimaryGeneratedColumn()
  transactionId: number;

  @ManyToOne(() => Stock, stock => stock.transactions)
  @JoinColumn({ name: "stockSymbol" })
  stock: Stock;

  @ManyToOne(() => Portfolio)
  @JoinColumn({ name: "portfolioId" })
  portfolio: Portfolio;

  @Column('int')
  quantity: number;

  @Column()
  transactionType: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  transactionDate: Date;
}
