import { Repository } from "typeorm";
import { Stock } from "../entities/Stock";
import { AppDataSource } from "../config";

export class StockService {
  private stockRepository: Repository<Stock>;

  constructor() {
    this.stockRepository = AppDataSource.getRepository(Stock);
  }

  async createStock(stockData: { symbol: string; name: string; price: number, quantity: number})  {
    const stock = this.stockRepository.create(stockData);
    await this.stockRepository.save(stock);

    return stock;
  }

  async findStockBySymbol(symbol: string) {
    return this.stockRepository.findOneBy({ symbol });
  }

  async getCurrentPrice(symbol: string) {
    const stock = await this.stockRepository.findOneBy({ symbol });
    if (!stock) {
      throw new Error("Stock not found.");
    }

    return stock.price;
  }

  async updateStockQuantity(symbol: string, quantityChange: number) {
    const stock = await this.stockRepository.findOneBy({ symbol });
    stock.quantity = quantityChange;

    await this.stockRepository.save(stock);
  }
}
