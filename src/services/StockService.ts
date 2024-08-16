import { Repository } from "typeorm";
import { Stock } from "../entities/Stock";
import {AppDataSource} from "../config";

export class StockService {
  private stockRepository: Repository<Stock>;

  constructor() {
    this.stockRepository = AppDataSource.getRepository(Stock);
  }

  async createStock(stockData: { symbol: string; name: string; price: number })  {
    const stock = this.stockRepository.create(stockData);
    await this.stockRepository.save(stock);

    return stock;
  }
}
