import cron from 'node-cron';
import { StockService } from '../services/StockService';
import { TransactionService } from '../services/TransactionService';

const ONE_HOUR = '0 * * * *';
const ONE_MINUTE = '* * * * *'; // It's for testing purposes

export function setupCronJobs() {
  cron.schedule(ONE_HOUR, async () => {
    try {
      console.log('Hourly task running to update stock prices.');

      const stockService = new StockService();
      const transactionService = new TransactionService();

      const stocks = await stockService.findAll();

      const queue = stocks.map(async (stock) => {
        const totalBuy = await transactionService.getTotalBuyTransactions(stock.symbol);
        const totalSell = await transactionService.getTotalSellTransactions(stock.symbol);

        const demand = totalBuy?.total || 0;
        const supply = totalSell?.total || 0;

        // Update the stock price based on demand and supply
        if (demand > supply) {
          stock.price *= 1.05;
        } else if (demand < supply) {
          stock.price *= 0.95;
        }

        await stockService.update(stock);
      });

      await Promise.all(queue);
    } catch (error) {
      console.log('Error updating stock prices:', error);
    }
  });
}
