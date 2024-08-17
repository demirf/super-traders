import { Repository } from "typeorm";
import { Stock } from "../entities/Stock";
import { AppDataSource } from "../config";
import { Transaction } from "../entities/Transaction";
import { Portfolio } from "../entities/Portfolio";

export class TransactionService {
  private transactionRepository: Repository<Transaction>;

  constructor() {
    this.transactionRepository = AppDataSource.getRepository(Transaction);
  }

  async getTotalBuyTransactions(stockSymbol: string) {
    console.log('Stock Symbol:', stockSymbol)
    const response = await this.transactionRepository.createQueryBuilder("transaction")
      .select("SUM(transaction.quantity)", "total")
      .where("transaction.stockSymbol = :symbol", { symbol: stockSymbol })
      .andWhere("transaction.transactionType = 'BUY'")
      .andWhere("transaction.transactionDate > :date", { date: new Date(Date.now() - 3600 * 1000) })
      .getRawOne();

    console.log('Response:', response)

    return response;
  }

  async getTotalSellTransactions(stockSymbol: string) {
    const response = await this.transactionRepository.createQueryBuilder("transaction")
      .select("SUM(transaction.quantity)", "total")
      .where("transaction.stockSymbol = :symbol", { symbol: stockSymbol })
      .andWhere("transaction.transactionType = 'SELL'")
      .andWhere("transaction.transactionDate > :date", { date: new Date(Date.now() - 3600 * 1000) })
      .getRawOne();

    return response.total;
  }

  async createTransaction(stock: Stock, portfolio: Portfolio, quantity: number, transactionType: string) {
    const transaction = this.transactionRepository.create({
      stock,
      portfolio,
      quantity: quantity,
      transactionType: transactionType
    });

    await this.transactionRepository.save(transaction);
    return transaction;
  }
}
