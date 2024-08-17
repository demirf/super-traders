import { body, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const buyStockValidation: ValidationChain[] = [
  body('portfolioId').isInt().withMessage('Portfolio ID must be an integer').notEmpty().withMessage('Portfolio ID is required'),
  body('stockSymbol').isString().withMessage('Stock symbol must be a string').notEmpty().withMessage('Stock symbol is required'),
  body('quantity').isInt().withMessage('Quantity must be an integer').notEmpty().withMessage('Quantity is required'),
];

export const sellStockValidation: ValidationChain[] = [
  body('portfolioId').isInt().withMessage('Portfolio ID must be an integer').notEmpty().withMessage('Portfolio ID is required'),
  body('stockSymbol').isString().withMessage('Stock symbol must be a string').notEmpty().withMessage('Stock symbol is required'),
  body('quantity').isInt().withMessage('Quantity must be an integer').notEmpty().withMessage('Quantity is required'),
];

// Middleware to validate requests
export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};
