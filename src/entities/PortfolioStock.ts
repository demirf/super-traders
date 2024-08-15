import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Portfolio } from "./Portfolio";
import { Stock } from "./Stock";

const tableName = 'portfolio_stocks';

@Entity()
export class PortfolioStock {
  static tableName = tableName;

  @PrimaryColumn()
  portfolioId: number;

  @PrimaryColumn({ length: 3 })
  stockSymbol: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { scale: 2 })
  averagePrice: number;

  @ManyToOne(() => Portfolio, portfolio => portfolio.stocks)
  @JoinColumn({ name: "portfolioId" })
  portfolio: Portfolio;

  @ManyToOne(() => Stock)
  @JoinColumn({ name: "stockSymbol" })
  stock: Stock;
}
