import { Repository } from "typeorm";
import {AppDataSource} from "../config";
import {PortfolioStock} from "../entities/PortfolioStock";

export class PortfolioStockService {
  private portfolioStockRepository: Repository<PortfolioStock>;

  constructor() {
    this.portfolioStockRepository = AppDataSource.getRepository(PortfolioStock);
  }

  async addStockToPortfolio(portfolioId: number, stockSymbol: string, quantity: number, price: number) {
    const portfolioStock = this.portfolioStockRepository.create({
      portfolioId,
      stockSymbol,
      quantity,
      averagePrice: price
    });
    await this.portfolioStockRepository.save(portfolioStock);
  }

  async updateStockInPortfolio(portfolioId: number, stockSymbol: string, quantity: number) {
    const portfolioStock = await this.portfolioStockRepository.findOne({
      where: { portfolioId, stockSymbol }
    });
    if (portfolioStock) {
      portfolioStock.quantity += quantity;
      await this.portfolioStockRepository.save(portfolioStock);
    } else {
      throw new Error("Stock not found in portfolio.");
    }
  }

  async findPortfolioStock(portfolioId: number, stockSymbol: string) {
    return this.portfolioStockRepository.findOne({
      where: {
        portfolioId: portfolioId,
        stockSymbol: stockSymbol
      }
    });
  }
}
