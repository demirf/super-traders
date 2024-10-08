import { StockService } from "../services/StockService";
import { UserService } from "../services/UserService";
import { AppDataSource } from "../config";
import { PortfolioService } from "../services/PortfolioService";

async function seedDatabase() {
  await AppDataSource.initialize()
    .then(async () => {
      const stockService = new StockService();
      const userService = new UserService();
      const portfolioService = new PortfolioService();

      const stocks = [
        { symbol: "EVA", name: "EVA Inc.", price: 1200.00, quantity: 100 },
        { symbol: "DMR", name: "Demir Corp.", price: 900.00, quantity: 100 },
        { symbol: "APL", name: "Apple Inc.", price: 400.00, quantity: 100 },
        { symbol: "AMZ", name: "Amazon.com Inc.", price: 3500.00, quantity: 100 },
        { symbol: "TSL", name: "Tesla Inc.", price: 800.00, quantity: 100 }
      ];

      for (const stockData of stocks) {
        await stockService.createStock(stockData);
      }

      const users = [
        { username: "user1" },
        { username: "user2" },
        { username: "user3" },
        { username: "user4" },
        { username: "user5" }
      ];

      for (const userData of users) {
        const user = await userService.createUser(userData);

        await portfolioService.createPortfolio(user);
      }

      console.log('Database seeded successfully!');
    })
    .catch(error => {
      console.error('Error during Data Source initialization:', error);
    })
    .finally(async () => {
      await AppDataSource.destroy();
    });
}

seedDatabase()
