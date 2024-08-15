import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { PortfolioStock } from "./PortfolioStock";

const tableName = 'portfolios';

@Entity()
export class Portfolio {
  static tableName = tableName;

  @PrimaryGeneratedColumn()
  portfolioId: number;

  @ManyToOne(() => User, user => user.portfolios)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => PortfolioStock, portfolioStock => portfolioStock.portfolio)
  stocks: PortfolioStock[];
}
