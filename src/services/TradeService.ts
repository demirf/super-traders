import { StockService } from './StockService';
import { PortfolioStockService } from "./PortfolioStockService";
import { PortfolioService } from "./PortfolioService";

// It's aggregate service that uses StockService, PortfolioService and PortfolioStockService
export class TradeService {
  private stockService: StockService;
  private portfolioService: PortfolioService;
  private portfolioStockService: PortfolioStockService

  constructor() {
    this.stockService = new StockService();
    this.portfolioService = new PortfolioService();
    this.portfolioStockService = new PortfolioStockService();
  }

  async buyStock(portfolioId: number, stockSymbol: string, quantity: number) {
    const stock = await this.stockService.findStockBySymbol(stockSymbol);

    if (!stock) {
      throw new Error("Stock not registered.");
    } else if (stock.quantity < quantity) {
      throw new Error("Insufficient stock quantity available.");
    }

    const portfolio = await this.portfolioService.getPortfolioById(portfolioId);
    if (!portfolio) {
      throw new Error("Portfolio not registered.");
    }

    // Decrease the stock quantity in the Stocks table
    await this.stockService.updateStockQuantity(stockSymbol, stock.quantity - quantity);

    // Update the portfolio with the new stock purchase
    await this.portfolioStockService.addStockToPortfolio(portfolioId, stockSymbol, quantity, stock.price);
    return {
      message: "Stock purchased successfully",
      transactionDetails: {
        stockSymbol,
        quantity,
        transactionCost: stock.price * quantity
      }
    };
  }

  async sellStock(portfolioId: number, stockSymbol: string, quantity: number) {
    const stock = await this.stockService.findStockBySymbol(stockSymbol);
    const portfolioStock = await this.portfolioStockService.findPortfolioStock(portfolioId, stockSymbol);
    if (!portfolioStock || portfolioStock.quantity < quantity) {
      throw new Error("Insufficient stock quantity to sell.");
    }

    await this.stockService.updateStockQuantity(stockSymbol, stock.quantity + quantity);

    const currentPrice = await this.stockService.getCurrentPrice(stockSymbol);
    await this.portfolioStockService.updateStockInPortfolio(portfolioId, stockSymbol, -quantity);

    return {
      message: "Stock sold successfully",
      transactionDetails: {
        stockSymbol,
        quantity,
        transactionRevenue: currentPrice * quantity
      }
    };
  }
}
