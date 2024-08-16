import { Request, Response } from 'express';
import { TradeService } from '../services/TradeService';

export class TradeController {
  private tradeService: TradeService;

  constructor() {
    this.tradeService = new TradeService();
  }

  buyStock = async (req: Request, res: Response) => {
    const { portfolioId, stockSymbol, quantity } = req.body;
    try {
      const result = await this.tradeService.buyStock(portfolioId, stockSymbol, quantity);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  sellStock = async (req: Request, res: Response) => {
    const { portfolioId, stockSymbol, quantity } = req.body;
    try {
      const result = await this.tradeService.sellStock(portfolioId, stockSymbol, quantity);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
