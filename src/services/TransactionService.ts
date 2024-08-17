import {Repository} from "typeorm";
import { Stock } from "../entities/Stock";
import { AppDataSource } from "../config";
import {Transaction} from "../entities/Transaction";
import {Portfolio} from "../entities/Portfolio";

export class TransactionService {
  private transactionRepository: Repository<Transaction>;

  constructor() {
    this.transactionRepository = AppDataSource.getRepository(Transaction);
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
