import { Router } from 'express';
import { TradeController } from "../controllers/TradeController";
import { buyStockValidation, sellStockValidation, validate } from "../validators/trade.validator";

const router = Router();
const tradeController = new TradeController();

router.post('/buy', buyStockValidation, validate, tradeController.buyStock);
router.post('/sell', sellStockValidation, validate, tradeController.sellStock);

export default router;
