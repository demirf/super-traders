import { appEventEmitter } from './eventEmitter';
import { TransactionService } from "../services/TransactionService";
import { TransactionType } from "../enums";

appEventEmitter.on('trade', async (stock, portfolio, quantity, transactionType: TransactionType) => {
  try {
    const transactionService = new TransactionService();
    await transactionService.createTransaction(stock, portfolio, quantity, transactionType);
  } catch (error) {
    // We can log the error to database or a monitoring service or send an email to developers
    console.error('Error creating transaction:', error);
  }
});
