import { Repository } from "typeorm";
import { AppDataSource } from "../config";
import { Portfolio } from "../entities/Portfolio";
import { User } from "../entities/User";

export class PortfolioService {
  private portfolioRepository: Repository<Portfolio>;

  constructor() {
    this.portfolioRepository = AppDataSource.getRepository(Portfolio);
  }

  async createPortfolio(user: User)  {
    const portfolio = this.portfolioRepository.create({ user });
    await this.portfolioRepository.save(portfolio);

    return portfolio;
  }

  async getPortfolioById(portfolioId: number) {
    return this.portfolioRepository.findOneBy({ portfolioId });
  }
}
