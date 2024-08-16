import { Router } from 'express';
import { TradeController } from "../controllers/TradeController";

const router = Router();
const tradeController = new TradeController();

router.post('/buy', tradeController.buyStock);
router.post('/sell', tradeController.sellStock);

export default router;
